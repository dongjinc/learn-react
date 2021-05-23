import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const Title = styled.h1`
    font-size: 20px;
    text-align: center;
`

class ProductCategoryRow extends React.Component<PropsWithChildren<{category: string}>> {
    render(){
        const category = this.props.category
        const StyleTr = styled.tr`
            border: 13px solid blue!important;
            color: blue!important;
        `
        return (
            <StyleTr>
                <th colSpan={2}>
                    <Title>
                     {category}
                    </Title>
                </th>
            </StyleTr>
        )
    }
}

const StyleLink = styled(ProductCategoryRow)`
    border: 1px solid red;
    color: blue!important;
`
class ProductRow extends React.Component<PropsWithChildren<{product: PRODUCTS}>> {
    render(){
        const {name: productName, stocked, price} = this.props.product
        const name = stocked ? productName:<span style={{color: 'red'}}>
            {productName}
        </span>
        return (
            <tr>
                <td>{name}</td>
                <td>{price}</td>
            </tr>
        )
    }
}

interface PRODUCTS {
    category?: string;
    price: string;
    stocked: boolean;
    name: string;
}

class ProductTable extends React.Component<PropsWithChildren<{inStockOnly: boolean, filterText: string, products: PRODUCTS[]}>> {
    render(){
        // filterText: string, 
        const {inStockOnly, products, filterText} = this.props
        const rows = []
        let currentCategory = ''

        // react props值一旦改变 render会重新操作，不会影响性能吗

        products.forEach(product => {
            const {category, name, stocked} = product
            if(!~name.indexOf(filterText.toUpperCase())){
                return false
            }
            if(inStockOnly && !stocked){
                return false
            }
            if(currentCategory !== category){
                const categoryDom = <StyleLink category={category} key={category} />
                rows.push(categoryDom)
                currentCategory = category
            }
            const productDom = <ProductRow product={product} key={name} />
            rows.push(productDom)
        })

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}


class SearchBar extends React.Component<PropsWithChildren<{inStockOnly: boolean, filterText: string,onInStockChange: (inStockOnly: boolean) => void, onFilterTextChange: (filterText: string) => void}>> {
    constructor(props){
        super(props);
        this.handleInStockChange = this.handleInStockChange.bind(this)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    }
    handleFilterTextChange(e: React.ChangeEvent<HTMLInputElement>){
        this.props.onFilterTextChange(e.target.value)
    }
    handleInStockChange(e: React.ChangeEvent<HTMLInputElement>){
        this.props.onInStockChange(e.target.checked)
    }
    render(){
        return (
            <form>
                <input type="text" placeholder="Search..."  value={this.props.filterText} onChange={this.handleFilterTextChange} />
                <p>
                    <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleInStockChange} />
                </p>
            </form>
        )
    }
}


class FilterableProductTable extends React.Component<{products: PRODUCTS[]}, {filterText: string, inStockOnly: boolean}> {
    constructor(props){
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleInStockChange = this.handleInStockChange.bind(this)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    }
    handleFilterTextChange(filterText: string){
        this.setState({
            filterText
        })
    }
    handleInStockChange(inStockOnly: boolean){
        this.setState({
            inStockOnly
        })
    }
    render(){
        return (
            <div>
                <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onInStockChange={this.handleInStockChange} onFilterTextChange={this.handleFilterTextChange} />
                <ProductTable filterText={this.state.filterText} products={this.props.products} inStockOnly={this.state.inStockOnly} />
            </div>
        )
    }
}



  export default FilterableProductTable