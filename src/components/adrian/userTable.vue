<template>
  <v-card>
    <v-tabs v-model="tab" background-color="transparent"  grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat>
          <Table :index="tab"/>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Table from "@/components/adrian/table";
export default {
  components: { Table},
  data() {
    return {
      tab: null,
      items: ["Customer", "Cashier", "Admin"],
    };
  },
};
</script>