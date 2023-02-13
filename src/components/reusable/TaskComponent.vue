<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref, computed } from 'vue';
import SelectComponent from '@/components/reusable/SelectComponent.vue';
import { useTaskStore } from '@/store/task';
import { storeToRefs } from 'pinia';
  
const taskStore = useTaskStore();
const { data } = storeToRefs(taskStore);

const state = reactive({
    x: 0,
    y: 0,
    isSelected: false,
    id: 0,
});


const handler = (event: MouseEvent, id:number) => {
    if (event) {
        event.preventDefault();
        state.id = id;
        state.x = event.clientX;
        state.y = event.clientY;
        state.isSelected = true;
    } else {
        state.isSelected = false;
    }
}

const element = ref<null | HTMLElement>(null);

const handleClickOutside = (event: Event):void => {
    if (element.value && !element.value.contains(event.target as Node)) {
        state.isSelected = false;
    }
};

const hasPicked = computed(() => {
    return  data.value.some(row => row.isPicked || row.subrows.some(subrow => subrow.isPicked));
});

onMounted(() => {
    taskStore.getTaskList();
    document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
    <table class="task-component">
        <tbody v-for="row in data" :key="row.id">
            <tr>
                <td class="row" :class="{completed : row.isCompleted}" @contextmenu="handler($event, row.id)"> 
                    <div class="left"> 
                        <button 
                            v-if="row.subrows.length > 0"
                            @click="row.isOpen = !row.isOpen">
                            {{ row.isOpen ? '▼' : '▲' }} 
                        </button> 
                        <input class="input" v-model="row.name">
                    </div>
                    <input class="checkbox" type="checkbox" v-model="row.isPicked"/>
                </td>
            </tr> 
            <template v-if="row.isOpen">
                <tr v-for="subrow in row.subrows" :key="subrow.id">
                    <td class="row subrow" :class="{completed : subrow.isCompleted}" @contextmenu="handler($event, subrow.id)">
                        <input class="input" v-model="subrow.name">
                        <input class="checkbox" type="checkbox" v-model="subrow.isPicked"/>
                    </td>
                </tr>
            </template>  
        </tbody>
        <div ref="element">
            <SelectComponent 
                :is-active="state.isSelected" 
                :x="state.x" 
                :id="state.id"
                :y="state.y"
                >
            </SelectComponent>
        </div>
        <button v-if="hasPicked" class="delete" @click="taskStore.removeChosen">
            <img src="@/assets/img/delete-32.png" alt="" />
        </button>
  </table>
</template>

<style lang="scss" scoped>
.task-component {
    color: black;
    width: 100%;

    .row {
        width: 100%;
        padding: 1rem 2.25rem;

        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }
    .subrow {
        padding: 0.5rem 2.25rem 0.5rem 4.25rem ;
        cursor: pointer;
    }
    .left {
        display: flex;
        flex-flow: row;
        gap: 1rem;
        width: 100%;
    }
    .checkbox {
        cursor: pointer;
    }
    .input {
        background-color: inherit;
        border: none;
        width: 100%;
    }
    .input:focus {
        outline: none;
    }
    .delete {
        position: absolute;
        margin-top: 2.25rem;
    }

    .completed {
        background-color: greenyellow;
    }
   
}
</style>