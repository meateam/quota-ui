<template>
  <div class="dialog">
    <v-dialog v-model="dialog" width="800px" height="800px">
      <v-card>
        <v-card-title>{{ $t("dialog.title") }}</v-card-title>

        <v-card-text>
          <v-text-field
            :label="$t('dialog.amount')"
            :rules="amountRules"
            hide-details="auto"
            dense
            appendIcon="GB"
            v-model="size"
            class="ma-5"
          ></v-text-field>
          <v-text-field
            :label="$t('dialog.info')"
            hide-details="auto"
            dense
            appendIcon="mdi-pencil"
            v-model="info"
            class="ma-5"
          ></v-text-field>
          <div v-if="user">
            <p>{{ `${$t("dialog.username")}: ${user.display}` }}</p>
            <v-row>
              <p>{{ `${$t("dialog.unit")}: ${user.currentUnit}` }}</p>
              <p>{{ `${$t("dialog.rank")}: ${user.rank}` }}</p>
            </v-row>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="approve">{{
            $t("dialog.approve")
          }}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { createApprovedQuota } from "@/api/quota-approval";
import { getUserQuota } from "@/api/quota";
// import { GBToBytes } from "@/utils/size.convert";

export default {
  data() {
    return {
      amountRules: [
        (value) => !!value || this.$t("required"),
        (value) => !isNaN(value) || this.$t("numericValue"),
      ],
      size: undefined,
      info: "",
    };
  },
  props: { dialog: { type: Boolean }, user: { type: Object, required: true } },
  methods: {
    approve() {
      if (this.user) {
        const usersQuota = getUserQuota(this.user.id);
        console.log(usersQuota);
        // TODO: mul quota by 1024 ^ 3
        // GBToBytes
        createApprovedQuota();
      }
      this.dialog = false;
    },
    reject() {
      if (this.user) {
        // rejectUserQuota(this.user.id);
      }
      this.dialog = false;
    },
  },
};
</script>
<style scoped>
</style>