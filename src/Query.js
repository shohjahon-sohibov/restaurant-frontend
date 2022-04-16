import { gql } from '@apollo/client'

const CATEGORIES = gql`
    query {
        getCategories{
            id
            name
        }
    }
`

const RESTAURANTS = gql`
    query getRestaurants($categoryId: ID!) {
        getRestaurants(categoryId: $categoryId) {
            id
            name
        }
    }
` 

const BRANCHES = gql`
    query getBranches($restaurantId: ID!) {
        getBranches(restaurantId: $restaurantId) {
            id
            name
        
        }
    }
`

const ALL_MENU = gql`
    query {
        getAllMenu {
            id
            name
            price
            branchId
        }
        }
`

const MENU = gql`
    query getMenu( $branchId: ID!) {
        getMenu(branchId: $branchId) {
            id
            name
            price
        }
    }
`

const ORDERS = gql`
    query getOrders($branchId: ID!) {
        getOrders(branchId: $branchId) {
            id
            name
            number
            price
            createdAt
            location
        }
    }
`

const NEW_TEMP_ORDER = gql`
    mutation  newTempOrder($name: String! $price: Int! $branchId: ID!)  {
        newTempOrder(name: $name price: $price branchId: $branchId )
    }
`

const NEW_ORDER = gql`
    mutation newOrder($name: String!  $price: Int! $location: String! $branchId: ID!) {
        newOrder(name: $name price: $price location: $location branchId: $branchId) {
            id
            name
            price
            createdAt
            location
        }
    }
`   


export {
    CATEGORIES,
    RESTAURANTS,
    BRANCHES,
    ALL_MENU,
    MENU,
    ORDERS,
    NEW_TEMP_ORDER,
    NEW_ORDER
}