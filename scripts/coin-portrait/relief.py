"""Builds the Kopf portrait relief for the toss coin.

Usage:
  swift segment.swift photo.png mask.png
  python3 relief.py photo.png mask.png out-dir

Writes kopf-relief.png (grey = height, alpha = silhouette) and kopf-frost.png
(grey = hair texture, alpha = hair coverage) into out-dir. Hairline, glasses,
neck cut and crop are measured on the 1000x1000 left-facing profile photo; a
different photo needs new measurements. The hairline is the main recognition
feature: a narrow front strip, a deep bald corner, short dense hair behind.
"""
import math
import sys

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

SS = 4
rgb = Image.open(sys.argv[1]).convert('RGB')
mask = Image.open(sys.argv[2]).convert('L').point(lambda v: 255 if v > 128 else 0)
out_dir = sys.argv[3]
lum = rgb.convert('L')
W, H = rgb.size

# Silhouette: drop collar and suit near the neck, then cut like a coin bust.
h, s, v = rgb.convert('HSV').split()
collar = ImageChops.multiply(Image.eval(s, lambda x: 255 if x < 40 else 0), Image.eval(v, lambda x: 255 if x > 190 else 0))
suit = Image.eval(h, lambda x: 255 if 135 < x < 190 else 0)
lower = Image.new('L', rgb.size, 0)
ld = ImageDraw.Draw(lower)
ld.rectangle((520, 330, W, H), fill=255)
ld.rectangle((560, 280, W, H), fill=255)
body = ImageChops.subtract(mask, ImageChops.multiply(ImageChops.lighter(collar, suit), lower))
cut = Image.new('L', rgb.size, 255)
ImageDraw.Draw(cut).polygon([(330, 485), (700, 400), (W, 400), (W, H), (0, H), (0, 485)], fill=0)
body = ImageChops.multiply(body, cut).filter(ImageFilter.MedianFilter(9))
body = body.filter(ImageFilter.MinFilter(7)).filter(ImageFilter.MaxFilter(7))

# Hair, traced on a 2x zoom of the head (zoom origin 340/30).
Z = lambda pts: [(x / 2 + 340, y / 2 + 30) for x, y in pts]
hair = Image.new('L', rgb.size, 0)
hd = ImageDraw.Draw(hair)
hd.polygon(Z([(30, 260), (60, 180), (120, 130), (215, 85), (300, 30), (300, 120), (225, 130), (140, 170), (85, 220), (60, 265)]), fill=255)
hd.polygon(Z([(215, 95), (300, 30), (430, 30), (530, 80), (610, 170), (660, 290), (665, 440), (600, 470), (520, 430), (500, 335), (430, 322), (385, 335), (290, 335), (245, 280), (228, 200), (225, 125)]), fill=255)
hair = ImageChops.multiply(hair, body).filter(ImageFilter.GaussianBlur(2))

# Volume and facial detail.
dome = ImageOps.autocontrast(ImageChops.multiply(body.filter(ImageFilter.GaussianBlur(26)), body))
smooth = lum.filter(ImageFilter.GaussianBlur(1.4))
detail = ImageOps.autocontrast(ImageChops.subtract(smooth, lum.filter(ImageFilter.GaussianBlur(8)), 1, 128), cutoff=1.5)
# Hair keeps its real stubble texture; skin detail is softened further.
stubble = ImageOps.autocontrast(ImageChops.subtract(lum.filter(ImageFilter.GaussianBlur(0.6)), lum.filter(ImageFilter.GaussianBlur(2)), 1, 128), cutoff=2)
height = Image.blend(dome, detail, 0.34)
height = ImageChops.add(height, hair.point(lambda x: x * 26 // 255))
hair_tex = ImageChops.multiply(stubble, hair)
height = Image.composite(Image.blend(height, ImageChops.add(height, hair_tex.point(lambda x: x // 10)), 1.0), height, hair)

# Glasses as raised vector strokes.
gl = Image.new('L', (W * SS, H * SS), 0)
gd = ImageDraw.Draw(gl)
def ellipse(cx, cy, rx, ry, start=0, end=360, width=4):
    pts = [((cx + rx * math.cos(math.radians(a))) * SS, (cy + ry * math.sin(math.radians(a))) * SS) for a in range(start, end + 1, 2)]
    gd.line(pts, fill=255, width=width * SS, joint='curve')
ellipse(413, 300, 23, 23, width=4)
ellipse(381, 291, 10, 17, 90, 270, width=3)
gd.line([(436 * SS, 286 * SS), (552 * SS, 212 * SS), (585 * SS, 205 * SS)], fill=255, width=4 * SS, joint='curve')
gl = gl.resize((W, H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.8))
height = ImageChops.multiply(ImageChops.lighter(height, ImageChops.multiply(gl, body)), body)
lifted = ImageChops.multiply(height.point(lambda x: 110 + x * 145 // 255), body)

# Frost map: hair reads darker and rougher than the polished bald head.
frost_tex = ImageOps.autocontrast(lum.filter(ImageFilter.GaussianBlur(1.2)), cutoff=2).point(lambda x: 165 + x * 70 // 255)

# Crop around the head, stand it a little more upright, scale to the asset.
box = (300, 25, 770, 495)
def finish(img, mode):
    img = img.crop(box).resize((1100, 1100), Image.LANCZOS)
    return img.rotate(-6, resample=Image.BICUBIC, center=(560, 520)).resize((768, 768), Image.LANCZOS)
alpha = finish(body, 'L')
Image.merge('LA', (finish(lifted, 'L'), alpha)).save(f'{out_dir}/kopf-relief.png')
Image.merge('LA', (finish(frost_tex, 'L'), finish(hair, 'L'))).save(f'{out_dir}/kopf-frost.png')

prev_h = finish(lifted, 'L').filter(ImageFilter.EMBOSS)
gold = ImageOps.colorize(prev_h, (90, 60, 15), (250, 225, 160))
bg = Image.new('RGB', (768, 768), (200, 165, 90)); bg.paste(gold, (0, 0), alpha)
dark = Image.new('RGB', (768, 768), (120, 90, 40)); bg.paste(dark, (0, 0), finish(hair, 'L').point(lambda x: x * 2 // 5))
bg.resize((560, 560)).save(f'{out_dir}/preview.png')
