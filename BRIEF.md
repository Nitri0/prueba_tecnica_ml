Desafíos Técnicos

1. Renderizado de caracteristicas:
Las Caracteristicas tienen distinta visualizaciones, lo que me da a entender que dependiendo del tipo de producto puede modificarse;
cree molecules con visualizaciones específicas (range, highlights, category) y un orquestador (organism ProductChatacteristics) encargado de procesar las caracteristicas y renderizando el tipo específico. Permitiendo escalar las caracteristicas con un bajo impacto.

2. Uso de Variantes:
En este caso me apoye con la IA para generar una propuesta de variantes con precios y products id distinto. Me gustó la propuesta de generar un endpoint a partir de la variable y las variantes busque el id en el back y el front pueda redireccionar al detalle de ese producto. Me pareció practico y delego la responsabilidad al backend.

Ademas, cada producto puede tener sus propias variantes, por lo que vi interesante generar variantes dinamicas. El modulo mapea los productos con sus variantes unicas; logrando encontrar el product_id a partir de las variantes (capacidad, color, tamaño, etc).

3. Medios de Pago:
Al igual que las caracteristicas los medios de pago son dinamicos dependiendo de la categoria, en este caso las categorias son efectivo, debito, credito. La diferencia radica en que dependiendo del tipo se renderiza en un espacio puntual (zona de medio de pago en el front).

Resumen decisiones técnicas (frontend):

* Uso de atomic design para reutilización de componentes
* 


Resumen decisiones técnicas (backend):

* Uso de DDD para el modelado de negocio.
* Separacion de bounded context por lo que considero que podría escalar en tamaño, por ejemplo: las categorias pueden crecer dependiendo del tipo de producto; al shipping se le puede agregar el checkout; etc.
* Uso de Injección para hacer el codigo testeable y escalable.


Siguientes Pasos Backend:
1. Cache: implementación de cache para cada servicio.
2. Reemplazar archivos csv injectando la implementación de los repositorios que usen una base de datos.
3. Desarrollo de test End2End


Siguientes pasos Frontend
1. Agregar efecto lupa en galeria
2. Mejorar el diseño del navbar
3. Darle funcionalidad a las preguntas & respuestas
4. Proceso de Checkout


Mejoras:
* Productos relacionados:
En este momento el product_id se relaciona con otros productos, creando cada producto en el csv. Esto se puede mejorar seteando keys o slugs del producto y luego buscando slugs similiaras, obviamente esto detras de un cache para evitar sobrecargar la base de datos.

