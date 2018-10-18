using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using webApi_produtos.Models;
using webApi_produtos.Models.DAO;

namespace webApi_produtos.Controllers
{
    [EnableCors("*","*","*")]//Configuração do acesso ao webapi via javascript - libera os acessos
    public class ProdutosController : ApiController
    {



        /*GET: api/Produtos
        Lista o objeto produto, configurado na classe produtos(pasta Models)*/
        public IEnumerable<ProdutoDao> Get()
        {
            ProdutoDao produtos = new ProdutoDao();
            return produtos.ListarProdutos();
        }

        // GET: api/Produtos/5
        //Lista apenas um produto informado por parâmetro
        public ProdutoDao Get(int id)
        {
            ProdutoDao produtos = new ProdutoDao();
            //Retorna somente o produto com o id informado
            return produtos.ListarProdutos().Where(x => x.id ==id).FirstOrDefault();
        }

        // POST: api/Produtos
        //Adiciona um novo produto via método post
        public List<ProdutoDao> Post(ProdutoDao produto)
        {
            ProdutoDao _produto = new ProdutoDao();
            _produto.Inserir(produto);
            return _produto.ListarProdutos();
        }

        // PUT: api/Produtos/5
        //Método para atualizar o produto no controller
        public ProdutoDao Put(int id, [FromBody]ProdutoDao produto)
        {
            ProdutoDao _produto = new ProdutoDao();
            return _produto.Atualizar(id, produto);
        }

        // DELETE: api/Produtos/5
        //Método para deletar o produto no controller
        public void Delete(int id)
        {
            ProdutoDao _produto = new ProdutoDao();

            _produto.Deletar(id);

        }
    }
}
