<template>
  <v-navigation-drawer app right dark disable-resize-watcher permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Quota UI </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{
            $t("navbar." + item.title)
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "search", icon: "mdi-account-search", link: "/search" },
        { title: "pendingRequests", icon: "mdi-account-clock", link: "/pending" },
        { title: "approvedRequests", icon: "mdi-account-check", link: "/approved" },
        { title: "rejectedRequests", icon: "mdi-account-cancel", link: "/rejected" },
      ],
      right: null,
    };
  },
};
</script>