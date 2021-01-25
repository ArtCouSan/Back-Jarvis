CREATE FUNCTION proc_grafico_setor_papel_model(tipo varchar(250)) 
RETURNS 
	TABLE(
		"numeroSetores" bigint, 
		"setor" varchar(250)
		) AS $$
BEGIN
    RETURN QUERY 
    select 
		count(*) as "numeroSetores",
	    pvm."setor" as "setor"
	from papel_variavel_model pvm
	where pvm."tipoPapel" = $1
	group by pvm.setor;
END;
$$ LANGUAGE plpgsql;