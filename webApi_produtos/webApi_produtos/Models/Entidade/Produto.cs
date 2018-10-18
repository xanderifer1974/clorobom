using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace webApi_produtos.Models
{
    public class Produto
    {


        //Propriedades da classe produtos
        public int id { get; set; }
        public string nome { get; set; }
        public string categoria { get; set; }
        public string unidade { get; set; }
        public string fragancia { get; set; }
        public string cor { get; set; }
        public Boolean possuiKit { get; set; }
        public Boolean possuiFragancia { get; set; }
        public int quantidadeKit { get; set; }
        public double preco { get; set; }


    }
    
}