
//carrega o corpo da tabela
var tbody = document.querySelector('table tbody');
        //Variavel produto recebe um objeto
        var produto = {}

		//Função para cadastrar produtos na base Json
		function Cadastrar() {


 			//Associa o objeto produto as informações digitadas


 			produto.nome       = document.querySelector('#nome').value;
 			produto.categoria  = document.querySelector('#categoria').value;
 			produto.unidade    = document.querySelector('#unidade').value;
 			produto.fragancia  = document.querySelector('#fragancia').value;
 			produto.cor        = document.querySelector('#cor').value;
 			produto.possui_kit = document.querySelector('#poskit').value;
 			produto.possui_fragancia = document.querySelector('#posfrag').value;
 			produto.quantidadeKit    =  document.querySelector('#quantidade').value;
 			produto.preco           = document.querySelector('#preco').value;



 			console.log(produto);

			//Carrega produto, adicionando o produto novo.
			if(produto.id === undefined || produto.id===0){

             //salva produto
             salvarProdutos('POST', 0, produto);
         }
         else
			//edita produto	
		{
			salvarProdutos('PUT', produto.id, produto);
		}	

		carregaProdutos();

		//fecha a janela modal do bootstrap
			$('#myModal').modal('hide')	
	}

	function NovoProduto() {
		var btnSalvar = document.querySelector('#btnSalvar');
		var titulo = document.querySelector('#titulo');
		document.querySelector('#nome').value      = 	'';
		document.querySelector('#categoria').value = 	'Cloro e Desinfetante';
		document.querySelector('#unidade').value   =	'';
		document.querySelector('#fragancia').value =	'Não possui fragancia';
		document.querySelector('#cor').value 	   =	'Não possui cor';
		document.querySelector('#poskit').value    =	'false';
		document.querySelector('#posfrag').value   =	'false';
		document.querySelector('#quantidade').value=	'';
		document.querySelector('#preco').value     =	'';

			//Limpa o objeto produto
			produto = {}

			btnSalvar.textContent = 'Cadastrar';
			

			titulo.textContent = 'Cadastrar Produtos';	

            //abri a janela modal do bootstrap
			$('#myModal').modal('show')

	}

	function Cancelar( ) {

		var btnSalvar = document.querySelector('#btnSalvar');
		var titulo = document.querySelector('#titulo');
		document.querySelector('#nome').value      = 	'';
		document.querySelector('#categoria').value = 	'Cloro e Desinfetante';
		document.querySelector('#unidade').value   =	'';
		document.querySelector('#fragancia').value =	'Não possui fragancia';
		document.querySelector('#cor').value 	   =	'Não possui cor';
		document.querySelector('#poskit').value    =	'false';
		document.querySelector('#posfrag').value   =	'false';
		document.querySelector('#quantidade').value=	'';
		document.querySelector('#preco').value     =	'';

			//Limpa o objeto produto
			produto = {}

			btnSalvar.textContent = 'Cadastrar';
			

			titulo.textContent = 'Cadastrar Produtos';	

            //fecha a janela modal do bootstrap
			$('#myModal').modal('hide')


		}

        /*

        Função para carregar os produtos do webapi para a página web, através de 
        um objeto ajax.
        */
        function carregaProdutos( ){

			//Limpa o body antes de carregar
			tbody.innerHTML ='';


			 //Objeto utilizado para criar o Ajax
			 var xhr =  new XMLHttpRequest(); 		
        	/*

         -> Configuração do Ajax
         GET -> Informa o método GET no HTTP
         'http://localhost:51722/api/Produtos' -> Url do WepApi
         true -> Indicando que a chamada será assícrona

         */
         xhr.open('GET',`http://localhost:51722/api/Produtos`,true); 

        /*Ao carregar o ajax, será executado uma função anônima,
        exibindo a resposta no console.lo
        */
        xhr.onload = function()
        {
			/*Converte para json e armazena na varíavel as informações
			obtidas através do webapi_produtos*/
			var produtos=JSON.parse(this.responseText);
			/*Varre todo objeto json vindo do webapi, adicionando linhas
			através da função adicionar linhas
			*/
			for (var indice in produtos) {
				adicionaLinha(produtos[indice]);
			}
		}
			//Executa a chamada a função
			xhr.send();

		}		


		//------------------- SALVA PRODUTO -----------------------------
		/*

        Função para salvar os produtos do webapi para a página web, através de 
        um objeto ajax.
        */
        function salvarProdutos(metodo,id,corpo){


			 //Objeto utilizado para criar o Ajax
			 var xhr =  new XMLHttpRequest(); 

			//Se tipo e valor forem indefinidos, id receberá vazio
			if(id === undefined || id === 0)
				id ='';

        	/*

         -> Configuração do Ajax
         GET ou PUT -> Informa o método GET  ou POST, através do parâmetro metodo no HTTP
         'http://localhost:51722/api/Produtos/${id}' -> Url do WepApi
         false -> Indicando que a chamada será sícrona - para salvar ou editar precisa ser sícrona

         */
         xhr.open(metodo,`http://localhost:51722/api/Produtos/${id}`,false); 


		    //Informa o tipo de header
		    xhr.setRequestHeader('content-type','application/json');
			//Converte o arquivo JSON para text
			xhr.send(JSON.stringify(corpo));


            //fecha a janela modal do bootstrap
			$('#myModal').modal('hide')	

		}

		//Função para excluir produto
		function excluirProduto(id) {				

			 //Objeto utilizado para criar o Ajax
			 var xhr =  new XMLHttpRequest(); 


         /*-> Configuração do Ajax
         DELETE-> Informa o método DELETE, através do parâmetro metodo no HTTP
         'http://localhost:51722/api/Produtos/${id}' -> Url do WepApi
         false -> Indicando que a chamada será sícrona - para salvar ou editar precisa ser sícrona

         */
         xhr.open('DELETE',`http://localhost:51722/api/Produtos/${id}`,false); 


		    //envia requisição
		    xhr.send();	
		}

		//excluir produto e carrega os demais produtos
		function excluir_carregar(material) {



			bootbox.confirm({
    			message: `Confirmar a exclusão do produto ${material.nome} ?`,
    			buttons: {
    			    confirm: {
    			        label: 'SIM',
    			        className: 'btn-success'
    			    },
    			    cancel: {
    			        label: 'NÃO',
    			        className: 'btn-danger'
    			    }
    			},
    			callback: function (result) {
    			    if (result)	{
						excluirProduto(material.id);
			    		carregaProdutos();
						}
    			     
    			}
		});

			
			
		}

		carregaProdutos( );
		

		//Função para editar produtos na tabela
		function editarProduto(material){
			
			var btnSalvar = document.querySelector('#btnSalvar');
			var titulo = document.querySelector('#titulo');
			document.querySelector('#nome').value      = 	material.nome;
			document.querySelector('#categoria').value = 	material.categoria;
			document.querySelector('#unidade').value   =	material.unidade;
			document.querySelector('#fragancia').value =	material.fragancia;
			document.querySelector('#cor').value 	   =	material.cor;
			document.querySelector('#poskit').value    =	material.possuiKit;
			document.querySelector('#posfrag').value   =	material.possuiFragancia;
			document.querySelector('#quantidade').value=	material.quantidadeKit;
			document.querySelector('#preco').value     =	material.preco;


			btnSalvar.textContent = 'Salvar';
			

			titulo.textContent = `Editar Produto - ${material.nome}`;	

			produto = material;



			console.log(material);
		}
		

		//Função para adiciona linhas na tabela
		function adicionaLinha(material){

			

			

			var trow = `<tr>
			<td>${material.nome}</td>
			<td>${material.categoria}</td>
			<td>${material.unidade}</td>
			<td>${material.fragancia}</td>
			<td>${material.cor}</td>
			<td>${material.possuiKit}</td>
			<td>${material.possuiFragancia}</td>
			<td>${material.quantidadeKit}</td>
			<td>${material.preco}</td>
			<td><button class="btn btn-info"  data-toggle="modal" data-target="#myModal" onclick='editarProduto(${JSON.stringify(material)})'>Editar</button></td>
			<td><button class="btn btn-danger"  onclick='excluir_carregar(${JSON.stringify(material)})'>Excluir</button></td>
			</tr>
			`

			//Adciona o conteudo da variável trow na tabela
			tbody.innerHTML += trow;		


		}
