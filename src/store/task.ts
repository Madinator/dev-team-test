import { defineStore } from 'pinia';
import { taskApiService, RowT, SubrowT } from '@/services/api/task/index';


interface State {
    data: RowT[],
    fakeId: number
}

const data = [
    {
        id: 124,
        isOpen: false,
        name: 'Сделать верстку сайта',
        isPicked: false,
        isCompleted: false,
        subrows: [
        { id: 1, name: 'Subrow 1.1', isPicked: false, isCompleted: false },
        { id: 2, name: 'Subrow 2.1', isPicked: false, isCompleted: false },
        { id: 6, name: 'Subrow 2.1', isPicked: false, isCompleted: false },
        ],
    },
    {
        id: 12,
        isOpen: false,
        name: 'Подключить апи',
        isPicked: false,
        isCompleted: false,
        subrows: [
        { id: 3, name: 'Subrow 1.1', isPicked: false, isCompleted: false },
        { id: 4, name: 'Subrow 2.1', isPicked: false, isCompleted: false },
        { id: 7, name: 'Subrow 2.1', isPicked: false, isCompleted: false},
        ],
    },
    {
        id: 8,
        isOpen: false,
        name: 'Создать требования',
        isPicked: false,
        isCompleted: false,
        subrows: []
    },
]
export const useTaskStore = defineStore({
    id: 'TaskStore',
    state: (): State => ({
        data: [],
        fakeId: 140
    }),
    actions: {
        getTaskList(): void {
            this.$state.data = data;
        },
        getTaskById(id: number): RowT {
            
            return data.filter((row: RowT) => {
                if(row.id === id) {
                    return true;
                }
                else {
                    const element = row.subrows.find((subrow: SubrowT) => subrow.id === id)
                    return element;
                }
            })[0];
        },
        add(id: number): void {
            this.$state.data.find((row: RowT, index) => {
                if(row.id === id) {
                    this.$state.data.splice(index + 1, 0, {
                        id:  this.$state.fakeId++,
                        isOpen: false,
                        name: '',
                        isPicked: false,
                        isCompleted: false,
                        subrows: [],
                    })
                }
            })
        },
        addSub(id: number): void {
            this.$state.data.find((row: RowT) => {
                if(row.id === id) {
                   row.subrows.push({ id: this.$state.fakeId++, name: '', isPicked: false, isCompleted: false })
                }
                if(row.subrows.length > 0) {
                    row.subrows.find((subrow: SubrowT, index) => {
                        if(subrow.id === id) {
                            row.subrows.splice(index + 1, 0, { id: this.$state.fakeId++, name: '', isPicked: false, isCompleted: false })
                        }
                    })
                }
            })
        },
        remove(id: number): void {
           this.$state.data =   this.$state.data.filter((row: RowT) => {
                if (row.id === id) {
                return false;
                }
                if(row.subrows) {
                    row.subrows = row.subrows.filter((subrow: SubrowT) => subrow.id !== id);
                    return true;
                }
            });
        },
        mark(id: number): void {
           this.$state.data.find((row: RowT) => {
                if(row.id === id) {
                    row.isCompleted = !row.isCompleted;
                }
                if(row.subrows.length > 0) {
                    row.subrows.find((subrow: SubrowT) => {
                        if(subrow.id === id) {
                            subrow.isCompleted = !subrow.isCompleted;
                        }
                    })
                }
            });
        },
        removeChosen(): void {
            this.$state.data = this.$state.data.filter(item => !item.isPicked);

            this.$state.data.forEach(item => {
                if (item.subrows) {
                    item.subrows = item.subrows.filter(subrow => !subrow.isPicked);
                }
            });
        },
    }
})