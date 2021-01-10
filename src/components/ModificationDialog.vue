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
            <v-row class="d-flex justify-space-around">
              <p>{{ `${$t("dialog.unit")}: ${user.currentUnit}` }}</p>
              <p>{{ `${$t("dialog.rank")}: ${user.rank}` }}</p>
              <p>{{ `${$t("dialog.currentQuota")}: ${this.usersQuota} GB` }}</p>
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
import { GBToBytes, BytesToGB } from "@/utils/size.convert";

export default {
  data() {
    return {
      amountRules: [
        (value) => !!value || this.$t("required"),
        (value) => !isNaN(value) || this.$t("numericValue"),
      ],
      size: undefined,
      info: "",
      usersQuota: "?",
    };
  },
  props: { dialog: { type: Boolean }, user: { type: Object, required: true } },
  mounted() {
    getUserQuota(this.user.id).then((quota) => {
      this.usersQuota = BytesToGB(+quota.limit);
    });
  },
  methods: {
    approve() {
      if (this.user) {
        createApprovedQuota(GBToBytes(+this.size), this.info).then(() => {
          this.dialog = false;
        });
      }
    },
  },
};
</script>
<style scoped>
</style>