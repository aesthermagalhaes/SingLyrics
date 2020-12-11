       $(document).ready(function() {
      $('select').material_select();
      $("select[required]").css({position: 'absolute', display: 'inline', height: 0, padding: 0, width: 0});
		
  });
     $(document).ready(function(){		 
		 $('#telefone').mask("(00)00000-0000", {reverse: true})
		 $('#cpf').mask("000.000.000-00")
		 $('#idade').mask("00")
	 });	 
	 jQuery.validator.addMethod("validarCPF", function(value, element){
			value = jQuery.trim(value);
			value = value.replace('.','');
			value = value.replace('.','');
			cpf = value.replace('-','');
			
			while(cpf.length < 11){
				cpf = "0"+ cpf;
			}
			
			var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
			var a = [];
			var b = new Number;
			var c = 11;
			
			for (i=0; i<11; i++){
				a[i] = cpf.charAt(i);
				if (i < 9) b += (a[i] * --c);
			}
			
			if ((x = b % 11) < 2){ 
				a[9] = 0 	
			}else{ 
				a[9] = 11-x 
			}
			
			b = 0;
			c = 11;
			
			for (y=0; y<10; y++){
				b += (a[y] * c--);
			}
			
			if ((x = b % 11) < 2){ 
				a[10] = 0; 
			}else{
				a[10] = 11-x; 
			}

			var retorno = true;
			if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)){
				retorno = false;
			}

			return this.optional(element) || retorno;

		}, 
		
		"Informe um CPF válido" 
	);
	
	
	 $("#localVendedor").validate(
		{
		   rules:{
			   nome:{
				   required:true
				   
			   },
			   cpf:{
				   required: true,
				   minlength:14,
				   validarCPF:true

			   },
			   email:{
				   required:true,
				   email: true
			   },
			    idade:{
				   required:true,
				   max:80,
				   min:18
				   
			   },
			   escolha:{
			   	required:true
			   }
		   }, 
		   messages:{
			   nome:{
				   required:"Favor preencher campo o Nome"
			   },			   
			   cpf:{		   
				   required:"Favor preencher o campo CPF",
                   minlength:"Digite um CPF válido"				   
			   },
			   email:{			   
				   required:"Favor preencher o campo  Email",
				   email: "Favor informar um E-mail válido"
			   },
			    idade:{			   
				   required:"Favor preencher o campo idade",
				   max:"A idade maxima permitida e 80 anos",
				   min:"A idade minima exigida e 18 anos"
			   },
			   escolha:{			   
				   required:"Favor preencher o campo Sexo",
			   }

               			   
		   },
		   submitHandler: salvar,
		   errorElement : 'div',
		   errorPlacement: function(error, element) {
			  var placement = $(element).data('error');
			  if (placement) {
				$(placement).append(error)
			  } else {
				error.insertAfter(element);
			  }
			}
		}
	);
	


	function salvar(){
       
       var verificadordecpf = 0;

         var verificadordeemail = 0;

		
		vendedores = JSON.parse(localStorage.getItem('localVendedor'));

		if (vendedores == null){
            
			var vendedores = new Array();
            
		}	
		
		var vendedor = new Object();
		
		vendedor.nome = $('#nome').val();

		vendedor.escolha = $('#escolha').val();
        
		vendedor.idade = $('#idade').val();
        
		vendedor.cpf = $('#cpf').val();

		vendedor.email = $('#email').val();

		for(var i=0; i < vendedores.length;i++){
			 
			 if(vendedores[i].cpf == vendedor.cpf){
				 
				  verificadordecpf = 1;
			 }
		}


		for(var i=0; i < vendedores.length;i++){
			 
			 if(vendedores[i].email == vendedor.email){
				 
				  verificadordeemail = 1;
			 }
		}


		if(verificadordeemail == 1){
                
            alert('JÁ FOI CADASTRADO UM EMAIL IGUAL A ESTE! POR FAVOR CONFIRA E DIGITE NOVAMENTE');

			document.getElementById('email').value = "";

		}

		if(verificadordecpf == 1){
			alert('JÁ FOI CADASTRADO UM CPF COM ESTE NOME! POR FAVOR CONFIRA E DIGITE NOVAMENTE');

			document.getElementById('cpf').value = "";
		}else{

			if(vendedor.nome != '' && vendedor.telefone != '' && vendedor.idade != '' && vendedor.cpf != '' && vendedor.email != '' && verificadordeemail != 1){

		vendedores.push(vendedor)	
		
		localStorage.setItem('localVendedor', JSON.stringify(vendedores));
		
		$(location).attr('href', 'tabeladefuncionarios.html');

	}

	}
         

		
	}

