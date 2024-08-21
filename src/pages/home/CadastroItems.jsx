import { useState, useRef } from 'react'
import { v4 } from 'uuid'
import './CadastroItems.css'

function CadastroItems() {

  const [itemsCadastrados, setItemsCadastrados] = useState([])
  const [itemAtual, setItemAtual] = useState()
  const inputRefName = useRef()
  const inputRefdescricao = useRef()
  const inputRefcategoria = useRef()
  const card = useRef()

  function AddItems(){
    if(inputRefName.current.value !== '' && 
       inputRefdescricao.current.value !==  '' && 
       inputRefcategoria.current.value !== '')
      {
      setItemsCadastrados([{
        id: v4(), 
        name:inputRefName.current.value, 
        descricao: inputRefdescricao.current.value, 
        categoria: inputRefcategoria.current.value}, 
        ...itemsCadastrados])
  
        inputRefName.current.value = ''
        inputRefdescricao.current.value = ''
        inputRefcategoria.current.value = ''
    }
  }

  function Excluir(id){
    setItemsCadastrados(itemsCadastrados.filter(items => items.id !== id))
  }

  function Editar(item){
    setItemAtual(item)

    card.current.style.display = 'flex'
  }

  function AplicarEdit(){
    if(itemAtual.name !== '' && itemAtual.categoria !== '' && itemAtual.descricao !== ''){
      setItemsCadastrados(itemsCadastrados.map(item => itemAtual.id === item.id ? itemAtual:item))
      Fechar()
    }

  }

  function Fechar(){
    card.current.style.display = 'none'
  }



  return (
    <div id='principal'>
      <div id="CadastroItems">
        <h1>Cadastro De Items</h1>
        <div className="inputs">
          <input ref={inputRefName} placeholder='digite o nome...' type="text" />
          <input ref={inputRefdescricao} placeholder='digite uma descrição...' type="text" />
          <select ref={inputRefcategoria} name="" id="">
            <option value="">Escolha uma categoria...</option>
            <option value="DIVERSOS">DIVERSOS</option>
            <option value="GERAL">GERAL</option>
            <option value="EXEMPLO">EXEMPLO</option>
          </select>
          <button onClick={AddItems} className='btnCadastrar'>Cadastrar</button>
        </div>

        <div className="clear"></div>

        <ul>
          <div className="titulos">
            <span>Nome</span>
            <span>Descrição</span>
            <span>Categoria</span>
          </div>
          {
            itemsCadastrados.map((item) => (
              <div className='items' key={item.id}>
                <div className="paragrafos">
                  <p>{item.name}</p>
                  <p>{item.descricao}</p>
                  <p>{item.categoria}</p>
                </div>
                <div className="botoes">
                  <button onClick={() => Editar(item)} className="btnEditar">Editar</button>
                  <button onClick={() => Excluir(item.id)} className="btnExcluir">Excluir</button>
                </div>
              </div>
            ))
          }
        </ul>
      </div>

      {
        itemAtual && (

          <div ref={card} id="EditarItems">
            <div id="forms">
              <h1>Editar Item</h1>
              <div className="inputs">
                <input onChange={(e) => setItemAtual({...itemAtual, name: e.target.value})} value={itemAtual.name} placeholder='digite o nome...' type="text" />
                <input onChange={(e) => setItemAtual({...itemAtual, descricao: e.target.value})} value={itemAtual.descricao} placeholder='digite uma descrição...' type="text" />
                <select onChange={(e) => setItemAtual({...itemAtual, categoria: e.target.value})} value={itemAtual.categoria} name="" id="">
                  <option value="">Escolha uma categoria...</option>
                  <option value="DIVERSOS">DIVERSOS</option>
                  <option value="GERAL">GERAL</option>
                  <option value="EXEMPLO">EXEMPLO</option>
                </select>
                <div className="botoesCard">
                  <button onClick={Fechar} className='btnFechar'>Fechar</button>
                  <button onClick={AplicarEdit} className='btnCadastrar'>Aplicar</button>
                </div>
              </div>
            </div>
          </div>
        )}


    </div>
  )
}

export default CadastroItems
