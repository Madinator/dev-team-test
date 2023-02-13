<script lang="ts" setup>
import TaskComponent from '@/components/reusable/TaskComponent.vue';
</script>

<template>
    <div class="workers-list">
        <div class="inner-container">
            <TaskComponent class="table" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.workers-list {
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

    .table {
        margin-top: 3.42rem;
    }
}
</style>
  