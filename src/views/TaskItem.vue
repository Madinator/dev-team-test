<script lang="ts" setup>
import { useTaskStore } from '@/store/task';
import { RowT } from '@/services/api/task';
import route from '@/router';
import { onMounted, ref } from 'vue';

const row = ref<null | RowT>()
const taskStore = useTaskStore();

onMounted(() => {
    row.value = taskStore.getTaskById(Number(route.currentRoute.params.id))
})

</script>

<template>
    <div class="task-item">
        <div class="inner-container">
            <div v-if="row">
                <p>{{ row.name }}</p>
                <ul v-for="subrow in row.subrows" :key="subrow.id">
                    <li>{{ subrow.name }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.task-item {
    color: black;
    .inner-container {
        @include width-restriction;

        @media (min-width: 850px) {
            padding: 6.67rem 9.67rem 0;
        }

        @media (max-width: 1200px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 600px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 350px) {
            grid-template-columns: repeat(1, 1fr);
        }
    }
}
</style>
  