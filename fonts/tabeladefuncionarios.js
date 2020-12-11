
$(document).ready(function(){
			
	vendedores = JSON.parse(localStorage.getItem('localVendedor'));
	
	//https://datatables.net/plug-ins/i18n/Portuguese-Brasil
	$('#localVendedor').DataTable({
		"oLanguage": {
			"sProcessing":   "Processando...",
			"sLengthMenu":   "Mostrar _MENU_" ,
			"sZeroRecords":  "N&atilde;o foram encontrados resultados",
			"sInfo":         "Mostrando de _START_ at&eacute; _END_ de _TOTAL_ registros",
			"sInfoEmpty":    "Mostrando de 0 at&eacute; 0 de 0 registros",
			"sInfoFiltered": "(filtrado de _MAX_ registros no total)",
			"sInfoPostFix":  "",
			"sSearch":       "Buscar:",
			"sUrl":          "",
			"oPaginate": {
				"sFirst":    "Primeiro",
				"sPrevious": "Anterior",
				"sNext":     "Seguinte",
				"sLast":     "&Uacute;ltimo"
			}
		},				
		"aaData": vendedores,
		"aoColumns": [
		    { "data": "nome" },
			{ "data": "idade" },
			{ "data": "escolha" },
			{ "data": "cpf" },
			{ "data": "email" },
		]
	});
	
	$('select').material_select();
	
});	