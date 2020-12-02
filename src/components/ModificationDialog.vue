<template>
  <div class="dialog">
    <v-dialog v-model="dialog" width="500px" height="500px">
      <v-card>
        <v-card-title>{{ $t("dialog.title") }}</v-card-title>

        <v-card-text>
          <v-text-field
            :label="$t('dialog.amount')"
            :rules="amountRules"
            hide-details="auto"
            dense
            appendIcon="GB"
          ></v-text-field>
          <p v-if="user">{{ `${$t("dialog.to")}: ${user.display}` }}</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="reject">{{
            $t("dialog.reject")
          }}</v-btn>
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
import { approveUserQuota, rejectUserQuota } from "@/api/quota-approval";

export default {
  data() {
    return {
      amountRules: [
        (value) => !!value || this.$t("required"),
        (value) => !isNaN(value) || this.$t("numericValue"),
      ],
    };
  },
  props: { dialog: { type: Boolean }, user: { type: Object, required: true } },
  methods: {
    approve() {
      if (this.user) {
        approveUserQuota(this.user.id);
      }
      this.dialog = false;
    },
    reject() {
      if (this.user) {
        rejectUserQuota(this.user.id);
      }
      this.dialog = false;
    },
  },
};
</script>
<style scoped>
</style>