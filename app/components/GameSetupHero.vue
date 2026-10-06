<script setup lang="ts">
defineProps<{
  rounds: number
  seconds: number
}>()
</script>

<template>
  <div class="game-setup-copy">
    <div class="game-setup-wordmark">JUNGLE<span>/</span>QUIZ</div>
    <div class="game-setup-copy-main">
      <h1>Wer<br><em>spielt?</em></h1>
      <p>Zwei Teams. Vier Kategorien. Eine Chance zu stehlen.</p>
    </div>
    <div class="game-setup-copy-bottom">
      <div class="game-setup-meta">
        <span>{{ rounds }} Runden</span>
        <span>{{ seconds }} Sek.</span>
        <span>4 Kategorien</span>
      </div>
      <div class="game-setup-stamp" :aria-label="rounds + ' Runden, ' + seconds + ' Sekunden Antwortzeit'">
        <strong>{{ rounds }}</strong>
        <span>Runden<br><b>{{ seconds }} Sek.</b></span>
      </div>
    </div>
  </div>
</template>
