type Person = {
    Id: string,
    Name: string,
    Title: string,
    Photo: string,
    Tags: Tag[],
    Attention: Attention[],
    Profit: Profit[]
}

type Tag = {
    Name: string,
    Color: string,
}

type Attention = {
    Color: string,
    Amount: number
}

type Profit = {
    Color: string,
    Amount: string
}

export type { 
    Person
}