using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace webApi_produtos.Models.DAO
{
    public class ProdutoDao: Produto
    {

        public List<ProdutoDao> ListarProdutos()
        {

            //Obtem o arquivo Json na App_Data
            var caminhoArquivo = HostingEnvironment.MapPath(@"~/App_Data/cloroBom.json");
            //Grava o conteúdo do arquivo na variável json
            var json = File.ReadAllText(caminhoArquivo);
            //Converte o arquivo cloroBom para Json (objeto) e grava na variável lista produto
            var listaProdutos = JsonConvert.DeserializeObject<List<ProdutoDao>>(json);
            return listaProdutos;



        }
        //Método para reescrever o arquivo cloroBom.json
        public bool RescreverArquivo(List<ProdutoDao> listaProdutos)
        {
            //Obtem o arquivo Json na App_Data
            var caminhoArquivo = HostingEnvironment.MapPath(@"~/App_Data/cloroBom.json");
            //Converte o objeto produto para arquivo texto
            var json = JsonConvert.SerializeObject(listaProdutos, Formatting.Indented);
            //Escreve a lista de produtos no arquivo cloroBom.json
            File.WriteAllText(caminhoArquivo, json);

            return true;
        }
        //Método para adicionar produto no arquivo
        public ProdutoDao Inserir(ProdutoDao Produto)
        {
            //Variável recebe a lista de produtos através do método listarProdutos
            var listaProdutos = this.ListarProdutos();
            //Obtem o máximo id da relação de produtos
            var maxId = listaProdutos.Max(produto => produto.id);
            //Incrementa o máximo id em +1
            Produto.id = maxId + 1;
            //Adiciona um novo produto na lista
            listaProdutos.Add(Produto);

            //Utiliza o método ReescreverArquivo, para gravar lista de produtos
            RescreverArquivo(listaProdutos);

            return Produto;
        }
        //Método para atualizar item  da lista de produtos,recebendo id e produtos
        public ProdutoDao Atualizar(int id, ProdutoDao Produto)
        {
            //Variável recebe a lista de produtos através do método listarProdutos
            var listaProdutos = this.ListarProdutos();
            //Variável para armazenar o index do produto a ser atualizado
            var itemIndex = listaProdutos.FindIndex(p => p.id == id);
            //Condição para atualizar índices maior ou igual a zero, com base no id
            if (itemIndex >= 0)
            {
                Produto.id = id;
                listaProdutos[itemIndex] = Produto;
            }
            else
            {
                return null;
            }
            //Rescreve o arquivo com os produtos atualizados
            RescreverArquivo(listaProdutos);
            return Produto;


        }
        //Método para deletar item da lista de produtos, recebendo id e produtos
        public bool Deletar(int id)
        {
            //Variável recebe a lista de produtos através do método listarProdutos
            var listaProdutos = this.ListarProdutos();
            //Variável para armazenar o index do produto a ser deletado
            var itemIndex = listaProdutos.FindIndex(p => p.id == id);
            //Condição para deletar índices maior ou igual a zero, com base no id
            if (itemIndex >= 0)
            {
                //Remove item da lista
                listaProdutos.RemoveAt(itemIndex);
            }
            else
            {
                return false;
            }
            //Rescreve o arquivo com os produtos atualizados
            RescreverArquivo(listaProdutos);
            return true;
        }


    }
}
