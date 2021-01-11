CREATE FUNCTION proc_grafico_quantidade_papel_model(tipo varchar(250)) 
RETURNS 
	TABLE(
		"numeroQtnPapel" bigint, 
		"qtnPapelCorDeReferencia" varchar(250), 
		"ticketPapel" varchar(250)
		) AS $$
BEGIN
    RETURN QUERY 
    select 
    	sum(pvm."qntPapeis") as "numeroQtnPapel", 
	    pvm."papelCorDeReferencia" as "qtnPapelCorDeReferencia", 
	    pvm."ticket" as "ticketPapel"
	from papel_variavel_model pvm
	where pvm."tipoPapel" = $1
	group by pvm.ticket, "qtnPapelCorDeReferencia";
END;
$$ LANGUAGE plpgsql;