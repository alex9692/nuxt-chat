<template>
  <div>
    <Modal :show="show" @closeModal="show = $event">
      <template #avatar>
        <div class="box">
          <div class="field">
            <label class="label has-text-grey has-text-weight-medium"
              >Change Avatar</label
            >
            <div class="control avatar">
              <input
                type="text"
                v-model="avatarUrl"
                class="input"
                placeholder="enter avatar url"
                @input="$v.avatarUrl.$touch()"
              />

              <button
                :disabled="$v.$invalid"
                class="button is-info"
                @click="emitUpdatedValues(avatarUrl)"
              >
                Confirm
              </button>
            </div>
            <div v-if="$v.avatarUrl.$dirty">
              <span v-if="!$v.avatarUrl.url" class="help is-danger"
                >Url is invalid</span
              >
              <span
                v-if="$v.avatarUrl.url && !$v.avatarUrl.supportedFileTypes"
                class="help is-danger"
                >Image not supported</span
              >
            </div>
          </div>
        </div>
      </template>
    </Modal>
    <div class="card">
      <div class="card-content">
        <figure class="image is-3by2">
          <img @click="show = true" :src="avatar" alt="" />
          <client-only
            ><span class="icon edit has-text-info">
              <i class="far fa-2x fa-edit"></i> </span
          ></client-only>
        </figure>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <client-only>
            <span class="icon">
              <i class="fas fa-paperclip"></i>
            </span>
          </client-only>

          <p>{{ username }}</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { url } from "vuelidate/lib/validators";
import Modal from "~/components/Shared/Modal";
import { supportedFileTypes } from "~/helpers/supportedFileType";
export default {
  components: {
    Modal
  },
  props: {
    avatar: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false,
      avatarUrl: this.avatar
    };
  },
  validations: {
    avatarUrl: {
      url,
      supportedFileTypes
    }
  },
  methods: {
    emitUpdatedValues(val) {
      this.show = false;
      this.$store.dispatch("manage/user/SET_UPDATEDVALUES", { avatar: val });
      this.$store.commit("manage/user/SET_ALLOWSAVE", !this.$v.$invalid);
    }
  }
};
</script>


<style lang="css" scoped>
.image {
  position: relative;
}
.image img {
  opacity: 1;
  transition: all 200ms;
}
.icon.edit {
  position: absolute;
  top: 5%;
  right: 10%;
  visibility: hidden;
}
.image:hover img {
  cursor: pointer;
  opacity: 0.5;
}
.image:hover .icon.edit {
  visibility: visible;
}
.control.avatar {
  display: flex;
}
.control.avatar .input {
  flex-grow: 1;
}
</style>
