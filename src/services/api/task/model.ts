enum Actions {
    ENTER = "enter",
    ADD = "add",
    REMOVE = "remove",
    ADDSUB = "addSub",
    MARK = "mark"
}

type SubrowT = {
    id: number, 
    name: string, 
    isPicked: boolean, 
    isCompleted: boolean
}

type RowT = {
    
    id: number,
    isOpen: boolean,
    name: string,
    isPicked: boolean,
    isCompleted: boolean,
    subrows: SubrowT[]
}
export {
    Actions,
    type SubrowT,
    type RowT
}