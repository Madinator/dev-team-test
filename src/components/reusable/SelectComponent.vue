<script lang="ts" setup>
import { defineProps, toRefs, ref } from 'vue';
import { Actions } from '@/services/api/task';
import { useTaskStore } from '@/store/task';
import router from '@/router';

const taskStore = useTaskStore();

const props = defineProps({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false,
        required: true
    },
});

const { x, y, id, isActive} = toRefs(props);

const action = ref<null | Actions>(null);

const onchange = () => {
    if(action.value) {
        if(action.value === Actions.ENTER) { 
            router.push(`/TaskItem/${id.value}`)
        }
        if(action.value === Actions.ADD) { 
            taskStore.add(id.value) 
            return;
        }
        if(action.value === Actions.ADDSUB) {
            taskStore.addSub(id.value)
            return;
        }
        if(action.value === Actions.REMOVE) {
            taskStore.remove(id.value)
            return;
        }
        if(action.value === Actions.MARK) {
            taskStore.mark(id.value);
            return;
        }        
        action.value = null;
    }
};

</script>
<template>
    <select 
        v-show="isActive" 
        class="select-component" 
        @change="onchange" 
        v-model="action"
        placeholder="Действия"
        >
        <option :value="Actions.ENTER">Посмотреть</option>
        <option :value="Actions.ADD">Добавить</option>
        <option :value="Actions.ADDSUB">Добавить подзадачу</option>
        <option :value="Actions.REMOVE">Удалить</option>
        <option :value="Actions.MARK">Отметить выполненной</option> 
    </select>
</template>
<style lang="scss" scoped>
.select-component {
    position: absolute;
    top: calc(1px * v-bind('y'));
    left: calc(1px * v-bind('x'));
}
</style>