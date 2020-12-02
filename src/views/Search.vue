<template>
  <div class="home">
    <Autocomplete
      :placeholder="$t('autocomplete.Users')"
      :items="users"
      :isLoading="isLoading"
      :minLength="2"
      @select="onUserSelect"
      @type="getUsersByName"
      icon="mdi-magnify"
      class="autocomplete"
    />
    <Dialog :dialog="dialog" :user="selectedUser" />
  </div>
</template>

<script>
import * as usersApi from "@/api/users";
import Autocomplete from "../components/Autocomplete";
import Dialog from "@/components/ModificationDialog";

export default {
  name: "Search",
  data() {
    return {
      users: [],
      isLoading: false,
      dialog: false,
      selectedUser: null,
    };
  },
  components: {
    Autocomplete,
    Dialog,
  },
  methods: {
    getUsersByName(name) {
      if (this.isLoading) return;
      this.isLoading = true;
      usersApi
        .searchUsersByName(name)
        .then((users) => {
          this.users = users;
        })
        .finally(() => (this.isLoading = false));
    },
    onUserSelect(user) {
      if (!user) return;
      this.selectedUser = user;
      this.dialog = true;
    },
  },
};
</script>
<style scoped>
</style>