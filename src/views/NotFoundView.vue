<template>
  <section
    class="not-found-view portfolio-container relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center z-50"
  >
    <!-- Glitch Overlay -->
    <div class="glitch-overlay absolute inset-0 pointer-events-none z-10"></div>

    <!-- Content Card -->
    <div
      class="sw-panel relative z-20 p-1 md:p-1 max-w-2xl mx-4 w-full rounded-lg overflow-hidden"
    >
      <div
        class="relative bg-black/40 p-8 md:p-12 rounded flex flex-col items-center text-center"
      >
        <!-- Holographic Header -->
        <div
          class="hologram-container mb-8 relative w-full flex justify-center"
        >
          <h1
            class="glitch-text text-8xl md:text-9xl font-bold mb-4 font-orbitron"
            data-text="404"
          >
            404
          </h1>
        </div>

        <div class="sw-heading mb-6 w-full justify-center">
          <span class="text-xl md:text-2xl tracking-wider">
            {{ t("notFound.title") || "SYSTEM FAILURE" }}
          </span>
        </div>

        <p
          class="text-lg md:text-xl text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed font-inter"
        >
          {{
            t("notFound.message") ||
            "The coordinates you entered do not exist in our star charts. The signal is weak."
          }}
        </p>

        <button
          @click="goHome"
          class="sw-button group relative px-8 py-3 bg-transparent overflow-hidden rounded transition-all duration-300 flex items-center gap-3"
        >
          <span class="font-bold tracking-wider font-orbitron">
            {{ t("notFound.button") || "JUMP TO HYPERSPACE" }}
          </span>
        </button>
      </div>

      <!-- Decoration Borders -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-darker to-transparent"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-darker to-transparent"
      ></div>
    </div>

    <!-- CRT/Scanline Effect Overlay -->
    <div
      class="scanlines absolute inset-0 pointer-events-none z-30 opacity-20"
    ></div>
  </section>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useI18n } from "vue-i18n";
  import { onMounted } from "vue";
  import gsap from "gsap";

  const router = useRouter();
  const { t } = useI18n();

  const goHome = () => {
    router.push("/");
  };

  onMounted(() => {
    // Glitch animation for 404 text
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    tl.to(".glitch-text", {
      duration: 0.1,
      skewX: 10,
      x: 5,
      opacity: 0.8,
      ease: "power1.inOut",
    })
      .to(".glitch-text", {
        duration: 0.1,
        skewX: -10,
        x: -5,
        opacity: 1,
        ease: "power1.inOut",
      })
      .to(".glitch-text", {
        duration: 0.1,
        skewX: 0,
        x: 0,
        opacity: 1,
        ease: "power1.inOut",
      });
  });
</script>

<style scoped>
  .not-found-view {
    /* Background handling provided by portfolio-container class in global css */
  }

  .font-orbitron {
    font-family: "Orbitron", sans-serif;
  }

  .font-inter {
    font-family: "Inter", sans-serif;
  }

  .glitch-text {
    color: var(--primary-light);
    text-shadow: 4px 4px var(--primary-dark), -2px -2px #ff00de;
    position: relative;
  }

  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a0a0a; /* Matches card bg */
  }

  .glitch-text::before {
    left: 2px;
    text-shadow: -1px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
  }

  .glitch-text::after {
    left: -2px;
    text-shadow: -1px 0 #00fff9;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim2 5s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim {
    0% {
      clip: rect(2px, 9999px, 5px, 0);
    }
    20% {
      clip: rect(65px, 9999px, 100px, 0);
    }
    40% {
      clip: rect(12px, 9999px, 45px, 0);
    }
    60% {
      clip: rect(90px, 9999px, 95px, 0);
    }
    80% {
      clip: rect(23px, 9999px, 78px, 0);
    }
    100% {
      clip: rect(54px, 9999px, 21px, 0);
    }
  }

  @keyframes glitch-anim2 {
    0% {
      clip: rect(65px, 9999px, 100px, 0);
    }
    20% {
      clip: rect(12px, 9999px, 45px, 0);
    }
    40% {
      clip: rect(90px, 9999px, 95px, 0);
    }
    60% {
      clip: rect(2px, 9999px, 5px, 0);
    }
    80% {
      clip: rect(54px, 9999px, 21px, 0);
    }
    100% {
      clip: rect(23px, 9999px, 78px, 0);
    }
  }
  .scanlines {
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.2)
    );
    background-size: 100% 4px;
  }
</style>
