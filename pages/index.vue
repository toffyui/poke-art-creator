<template>
  <div
    class="leading-normal tracking-normal text-white gradient"
    style="font-family: 'Source Sans Pro', sans-serif"
  >
    <Header />
    <Section id="make" title="ポケモンでAA画像を作る">
      <div class="flex flex-wrap w-full">
        <div class="w-full sm:w-1/2 p-6 mx-auto">
          <h3
            class="md:text-3xl text-lg text-gray-800 font-bold leading-none mb-3"
          >
            {{ $t("ライブラリから画像を選択") }}
          </h3>
          <p class="text-gray-600 mb-3 text-base">
            {{ $t("選択できる画像は40Mバイトまでです。") }}
          </p>
          <label
            class="buttonCommon cursor-pointer inline-flex items-center text-white font-bold py-2 px-4 rounded-full"
          >
            <svg
              class="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
            <span class="ml-2 text-base leading-normal">{{
              $t("画像を選択")
            }}</span>
            <input
              id="file"
              ref="fileInput"
              type="file"
              accept=".jpeg, .png"
              class="hidden"
              @change="setImage"
            />
          </label>
          <p v-if="tooBig" class="text-red-500 mt-5">
            {{ $t("画像サイズが大き過ぎます。") }}<br />{{
              $t("40Mバイトまでの画像を選んでください。")
            }}
          </p>
          <p v-if="tooSmall" class="text-red-500 mt-5">
            {{ $t("画像サイズが小さ過ぎます。") }}<br />{{
              $t("300px以上の画像を選んでください。")
            }}
          </p>
          <h3
            class="md:text-3xl pt-5 text-lg text-gray-800 font-bold leading-none mb-3"
          >
            {{ $t("画像を変換する") }}
          </h3>
          <p
            v-if="!uploadImageUrl && !changedImageUrl"
            class="text-gray-600 mb-3 text-base"
          >
            {{ $t("先に画像を選択してください") }}
          </p>
          <p v-if="overlay" class="text-gray-600 mb-3 text-base">
            {{ $t("変換中...") }}
            <br />
            {{ $t("変換には15〜20秒ほどかかります。") }}
          </p>
          <p v-if="changedImageUrl" class="text-gray-600 mb-3 text-base">
            {{ $t("AA画像が作成されました！") }}
          </p>
          <label
            v-if="!overlay && uploadImageUrl && !changedImageUrl"
            class="buttonCommon cursor-pointer inline-flex items-center text-white font-bold py-2 px-4 rounded-full"
            @click="getArt"
          >
            <svg
              class="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
            <span class="ml-2 text-base leading-normal">{{
              $t("画像を変換する")
            }}</span>
          </label>
          <h3
            class="md:text-3xl pt-5 text-lg text-gray-800 font-bold leading-none mb-3"
          >
            {{ $t("画像をシェア/保存") }}
          </h3>
          <p v-if="!changedImageUrl" class="text-gray-600 mb-3 text-base">
            {{ $t("先にAA画像を作成してください") }}
          </p>
          <p v-if="changedImageUrl" class="text-gray-600 mb-3 text-base">
            {{ $t("シェアや保存などしてお楽しみください。") }}
          </p>
          <ul v-if="changedImageUrl" class="flex space-x-6 mx-auto">
            <li>
              <div @click="OpenTwitterModal" class="cursor-pointer">
                <img
                  alt="twitter"
                  src="../assets/img/twitter.svg"
                  :width="size"
                  :height="size"
                />
              </div>
            </li>
            <li>
              <div @click="OpenFBModal" class="cursor-pointer">
                <img
                  alt="twitter"
                  src="../assets/img/facebook.svg"
                  :width="size"
                  :height="size"
                />
              </div>
            </li>
            <li>
              <a :href="changedImageUrl" download>
                <img
                  alt="line"
                  src="../assets/img/download.svg"
                  :width="size"
                  :height="size"
                />
              </a>
            </li>
          </ul>
        </div>
        <div class="w-full mt-3 sm:w-1/2 relative">
          <img
            v-if="!uploadImageUrl && !changedImageUrl"
            src="../assets/img/defaultPic.png"
            alt="default"
            class="border-double border-4 border-gray-600"
            width="100%"
          />
          <img
            v-if="uploadImageUrl"
            class="border-double border-4 border-gray-600"
            :class="{ 'opacity-50': overlay }"
            width="100%"
            :src="uploadImageUrl"
          />
          <img
            v-if="changedImageUrl && !uploadImageUrl"
            class="border-double border-4 border-gray-600"
            width="100%"
            :src="changedImageUrl"
          />
          <Loading class="absolute overlay" v-if="overlay" />
        </div>
      </div>
    </Section>
    <Modal v-if="twitterModalFlag">
      <div>
        <img
          v-if="changedImageUrl"
          class="border-double border-4 mt-3 border-gray-600 mx-auto modalImageClass block w-full h-auto object-cover"
          :src="changedImageUrl"
        />
        <div @click="CloseModal" class="absolute cursor-pointer top-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-8 h-8"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <button
          @click="tweetButton"
          class="text-center mx-auto buttonCommon text-white font-bold rounded-b py-4 w-full shadow-lg hover:bg-yellow-400"
        >
          {{ $t("ツイートする") }}
        </button>
      </div>
    </Modal>
    <Modal v-if="FBModalFlag">
      <div>
        <img
          v-if="changedImageUrl"
          class="border-double border-4 mt-3 border-gray-600 mx-auto modalImageClass block w-full h-auto object-cover"
          :src="changedImageUrl"
        />
        <div @click="CloseModal" class="absolute cursor-pointer top-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-8 h-8"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <button
          @click="tweetButton"
          class="text-center mx-auto buttonCommon text-white font-bold rounded-b py-4 w-full shadow-lg hover:bg-yellow-400"
        >
          {{ $t("シェアする") }}
        </button>
      </div>
    </Modal>
    <Footer />
  </div>
</template>

<script>
import getArtImage from "~/assets/lib/getArt";
import postImageData from "~/assets/lib/postImageData";
import resizeImage from "~/assets/lib/resizeImage";
import Modal from "~/components/Modal.vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Section from "~/components/Section.vue";
import Loading from "~/components/Loading.vue";
export default {
  components: {
    Modal,
    Header,
    Footer,
    Section,
    Loading,
  },
  data() {
    return {
      changedImageUrl: "",
      uploadImageUrl: "",
      overlay: false,
      base64: "",
      uuid: "",
      twitterModalFlag: false,
      FBModalFlag: false,
      imageData: "",
      isFetched: false,
      tooBig: false,
      tooSmall: false,
    };
  },
  computed: {
    size() {
      return 54;
    },
    url() {
      return `https://poke.art-creator.net/art/${this.uuid}`;
    },
    twitterURL() {
      const shareText = this.$t("ポケモンAAツクールでAA画像を作ったよ");
      const hash = this.$t("#ポケモンAAツクール");
      return (
        `https://twitter.com/intent/tweet?url=${this.url}&text=` +
        encodeURIComponent(shareText + `\r\n` + hash)
      );
    },
    facebookURL() {
      const shareText = this.$t("ポケモンAAツクールでAA画像を作ったよ");
      const hash = this.$t("#ポケモンAAツクール");
      return `https://www.facebook.com/sharer/sharer.php?u=${this.url}&t=${shareText}\n${hash}`;
    },
  },
  mounted() {
    const cookieLocale = this.$cookies.get("locale");
    if (cookieLocale) {
      this.$i18n.locale = cookieLocale;
      return;
    }
    const userLanguage = navigator.language;
    const setLang = userLanguage === "ja" ? "ja" : "en";
    this.$cookies.set("locale", setLang);
    this.$i18n.locale = setLang;
  },
  methods: {
    tweetButton() {
      if (this.isFetched) {
        window.open(this.twitterURL, "_blank");
      }
    },
    FBButton() {
      if (this.isFetched) {
        window.open(this.facebookURL, "_blank");
      }
    },
    async OpenTwitterModal() {
      this.twitterModalFlag = true;
      this.uuid = this.generateUuid();
      await postImageData(this.uuid, this.imageData).then(() => {
        this.isFetched = true;
        window.history.pushState(null, null, `/art/${this.uuid}`);
      });
    },
    async OpenFBModal() {
      this.FBModalFlag = true;
      this.uuid = this.generateUuid();
      await postImageData(this.uuid, this.imageData).then(() => {
        this.isFetched = true;
        window.history.pushState(null, null, `/art/${this.uuid}`);
      });
    },
    CloseModal() {
      this.twitterModalFlag = false;
      this.FBModalFlag = false;
      this.isFetched = false;
      window.history.pushState(null, null, "/");
    },
    checkImageSize(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        if (file.size > 40 * 1000 * 1000) {
          this.tooBig = true;
          return;
        }
        this.tooBig = false;
        this.tooSmall = false;
        const outer = this;
        reader.onload = (e) => {
          const self = outer;
          this.uploadImageUrl = reader.result;
          const image = new Image();
          image.src = e.target.result;
          image.onload = () => {
            resolve(image);
            if (image.width < 300 || image.height < 300) {
              self.tooSmall = true;
              this.uploadImageUrl = "";
              return;
            }
          };
        };
        reader.readAsDataURL(file);
      });
    },
    async setImage(e) {
      const [file] = e.target.files;
      const image = await this.checkImageSize(file);
      if (image) {
        this.base64 = await resizeImage(image, 300, 300);
      }
      if (this.$refs.fileInput.value) {
        this.$refs.fileInput.value = "";
      }
      this.changedImageUrl = "";
    },
    getArt() {
      if (this.base64) {
        this.getResult(this.base64);
      }
    },
    generateUuid() {
      let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
      for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
          case "x":
            chars[i] = Math.floor(Math.random() * 16).toString(16);
            break;
          case "y":
            chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
            break;
        }
      }
      return chars.join("");
    },
    async getResult(file) {
      this.overlay = true;
      const res = await getArtImage(file);
      if (res.status !== 200) {
        alert(
          this.$t(
            "サーバーエラーが発生しました。しばらく経ってから再度お試しください。"
          )
        )
          ? ""
          : window.location.reload();
        return;
      }
      this.imageData = res.data.data;
      this.changedImageUrl = "data:image/png;base64," + this.imageData;
      this.uploadImageUrl = "";
      this.overlay = false;
    },
  },
};
</script>
<style>
.gradient {
  background: linear-gradient(90deg, #172249 0%, #1d3a71 50%, #ffca04 100%);
}

.imageClass {
  height: 200px;
}
.modalImageClass {
  max-height: 350px;
}

.buttonCommon {
  background: #1d3a71;
}

.buttonCommon:hover {
  background: #ffca04;
}
.overlay {
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
  margin: auto;
}
</style>
