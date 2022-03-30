# Space Cleaners #

Space Cleaners es un juego desarrollado con Phaser para la asignatura optativa DVI impartida en la Facultad de Informática de la Universidad Complutense de Madrid. La idea original del juego está basada en juegos de tipo arcade como el Space Invaders.

(CAPTURA DE PANTALLA DEL JUEGO)

Enlace para probar el juego: [https://lacabradelalegion.github.io/SpaceCleaners/proyecto_phaser/index.html](https://lacabradelalegion.github.io/SpaceCleaners/proyecto_phaser/index.html)

Enlace a la página pública del juego: [https://lacabradelalegion.github.io/SpaceCleaners/index.html](https://lacabradelalegion.github.io/SpaceCleaners/index.html)

Enlace a la presentación del hito 2: [https://www.canva.com/design/DAE8b4HLJrc/xw-BQ5fPmEQEBVGDEFIheg/view?utm_content=DAE8b4HLJrc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton](https://www.canva.com/design/DAE8b4HLJrc/xw-BQ5fPmEQEBVGDEFIheg/view?utm_content=DAE8b4HLJrc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

AVISO: Todo este contenido puede verse también en la página pública del juego.

Grupo: 8 (NOMBRE QUE NO TENEMOS. WIIIIII)


# GDD #

Aquí incluimos un pequeño resumen del GDD. Para consultar el documento que conteine el GDD completo del juego utilizar el siguiente enlace: [https://docs.google.com/document/d/10XLAFpWlU9FMnmG6lCexI5x2gXz0NO3c7H5pKOfypbc/edit?usp=sharing](https://docs.google.com/document/d/10XLAFpWlU9FMnmG6lCexI5x2gXz0NO3c7H5pKOfypbc/edit?usp=sharing)

## Datos generales ##

Género: arcade
Plataforma: ????
PEGI: 7 (Esto habrá que pensarlo, he puesto un número al azar pinto pinto gorgorito)
Descripción general: Este juego está basado en juegos de tipo arcade como el space invaders. En este caso el enemigo es un virus que ha infectado una serie de planetas que el jugador deberá desinfectar para ganar la partida. En cambio, si el virus consigue infectar la Tierra el jugador habrá perdido la batalla.

## Historia ##

La raza humana ha establecido colonias a lo largo y ancho de la galaxia. Una catástrofe natural ha hecho que se libere un virus mutado con el que estaban trabajando unos científicos en el planeta más lejano. Este virus se expande con mucha rapidez y ha mutado a pasos agigantados. Ahora todas las colonias han sido infectadas, los humanos que allí vivían son prácticamente zombies presas de la enfermedad y especímenes monstruosos fruto de las mutaciones del virus asolan las calles. Sólo queda la Tierra.

El gobierno mundial ha creado un ejército de emergencia y ha utilizado todos los recursos disponibles para aprovisionar a sus soldados de armas y medicinas diseñadas por sus científicos para eliminar la infección. La misión del jugador será liderar este ejército para destruir al virus.

## Funcionamiento general del juego ##

El funcionamiento del juego es muy sencillo. Al iniciar el juego hay 7 planetas además de la Tierra infectados por el virus. El jugador deberá ir desinfectando cada planeta hasta conseguir desinfectarlos todos.

Los planetas reperesentan distintos niveles del juego que van aumentando en dificultad cuanto más nos alejamos de la Tierra. Al iniciar la partida sólo el nivel 1 está desbloqueado (disponible para desinfectar). Cuando se desinfecta un planeta los planetas vecinos se desbloquean.

Cuando el jugador selecciona un planeta para desinfectar se inicia el nivel correspondiente. Cada nivel tiene 2 fases: desinfección y pelea con un boss. La primera fase consiste en eliminar todos los enemigos antes de que alcancen a nuestras tropas (límite inferior de la pantalla). En cada nivel aparecerá un boss que intentará matar al jugador lanzando distintos ataques. Si el jugador consigue matar al boss antes de quedarse sin vida habrá ganado la partida.

En caso de que el jugador gane ambas fases del nivel el planeta será desinfectado. En caso contrario el planeeta seguirá infectado. Cada batalla representa un turno. Cada turno el virus tiene una probabilidad determinada de reinfectar un planeta.

Cada vez que el jugador supera un nivel se le otorgan una serie de monedas que puede utilizar en la tienda del juego para comprar armas, medicinas y consumibles. Estos elementos se irán desbloqueando según el jugador vaya desbloqueando niveles.

### Mapa ###

El jugador deberá decidir qué planeta va a intentar desinfectar. Para ello dispone de un mapa en el que se muestran todos los planetas así como su estado (infectado o desinfectado) y si está desbloqueado o no. Se utiliza un código de colores para mostrar al jugador qué planetas están infectados y candados para simbolizar si está bloqueado.

Al comienzo de la partida, el mapa mostrará todos los planetas menos la Tierra como infectados. Además, el único planeta desbloqueado (posible desinfectar) es el planeta más cercano a la Tierra correspondiente al nivel 1. Cada planeta tiene un nivel de dificultad distinto y están ordenados en el mapa por nivel de dificultad utiliznado la Tierra como referencia.

Aspecto inicial del mapa:
(CAPTURA DE PANTALLA DEL MAPA)

Según el jugador va desinfectando niveles el siguiente nivel se desbloquea. Adicionalmente, tras cada batalla el virus tiene la posibilidad de reinfectar un planeta (la probabilidad de que esto sucede depende del nivel de dificultad del juego seleccionado por el jugador). Para que el jugador tenga la posibilidad de adaptarse al juego se dan unas rondas de tregua en las que los virus no reinfectan planetas (cuántas dependerá del nivel de dificutlad).

Características de los niveles de dificultad (provisional):
- EASY: probabilidad de reinfección 10% y 10 turnos de tregua.
- MEDIUM: probabilidad de reinfección 20% y 5 turnos de tregua.
- HARD: probabilidad de reinfección 40% y 2 turnos de tregua.

Por ejemplo, el jugador puede haber desinfectado los niveles 1, 2 y 3 pero los virus han reinfectado el planeta número 2 en el mismo turno quedando el mapa de la siguiente manera:

(CAPTURA DE PANTALLA DEL MAPA)

A continuación tenemos las características de cada nivel.

##### Nivel 1 #####

Número de virus mutados:
Número de humanos infectados:
Nivel máximo de virus:
Nivel máximo de humanos infectados:
Grupos:
Patrón:
Boss: nivel 1
Agujeros negros: No

##### Nivel 2 #####

##### Nivel 3 #####

##### Nivel 4 #####

##### Nivel 5 #####

##### Nivel 6 #####

##### Nivel 7 #####

### Enemigos ###

Hay dos etapas en cada ronda: desinfección del virus y pelea con el boss. En la primera etapa, el jugador deberá eliminar a todos los enemigos antes de que éstos lleguen al final de la pantalla (alcancen a las tropas). Una vez todos los enemigos son eliminados entra en escena el boss final (diferente para cada nivel). Para ganar la partida el jugador deberá bajar la vida del boss a 0 y eliminarlo. Por su parte el boss lanza ataques al jugador que le irán quitando vida. Si el jugador pierde toda su vida pierde la partida.

En la primera etapa hay dos tipos diferentes de enemigos: virus mutados y humanos infectados. El objetivo es eliminar los virus mutados utilizando armas y desinfectar a los humanos utilizando medicinas. Si se utiliza el arma sobre un humano mutará conviertiéndose en un virus de mayor nivel cuyo movimiento pasará a ser vertical. Lo mismo sucede si se ataca con una medicina a un virus.

#### Virus mutados ####

Los virus mutados pueden ser de 6 niveles.

##### Nivel 1 #####

Vidas: 1

Desplazamiento: en zig zag (5 a la derecha y 5 a la izquierda)

Mutación: se convierte en un virus mutado de nivel 2 y su desplazamiento pasa a ser vertical.

Spritesheet del virus moviéndose:

Imágen del virus recibiendo daño:

Spritesheet del virus muriendo:

##### Nivel 2 #####

Vidas: 2

Desplazamiento: en zig zag (10 a la derecha y 10 a la izquierda de dos en dos)

Mutación: se convierte en un virus mutado de nivel 3 y su desplazamiento pasa a ser vertical.

Spritesheet del virus moviéndose:

Imágen del virus recibiendo daño:

Spritesheet del virus muriendo:

##### Nivel 3 #####

Vidas: 3

Desplazamiento: en zig zag alternando (primero 5 a la derecha y 5 a la izquierda de uno en uno y luego 10 a la derecha y 10 a la izquierda de dos en dos)

Mutación: se convierte en un virus mutado de nivel 2 y su desplazamiento pasa a ser vertical.

Spritesheet del virus moviéndose:

Imágen del virus recibiendo daño:

Spritesheet del virus muriendo:

##### Nivel 4 #####

Vidas: 5

Desplazamiento: en zig zag alternando (dos veces 5 a la derecha y 5 a la izquierda de uno en uno y luego 10 a la derecha y 10 a la izquierda de dos en dos)

Mutación: se convierte en un virus mutado de nivel 2 y su desplazamiento pasa a ser vertical.

Spritesheet del virus moviéndose:

Imágen del virus recibiendo daño:

Spritesheet del virus muriendo:

##### Nivel 5 #####

Vidas: 7

Desplazamiento: en zig zag alternando (dos veces 5 a la derecha y 5 a la izquierda de uno en uno y luego dos veces 10 a la derecha y 10 a la izquierda de dos en dos)

Mutación: se convierte en un virus mutado de nivel 2 y su desplazamiento pasa a ser vertical.

Spritesheet del virus moviéndose:

Imágen del virus recibiendo daño:

Spritesheet del virus muriendo:

##### Nivel 6 #####

Vidas: 8

Desplazamiento: en zig zag (20 a la derecha y 20 a la izquierda de dos en dos)

Mutación: se convierte en un virus mutado de nivel 2 y su desplazamiento pasa a ser vertical.

Spritesheet del virus moviéndose:

Imágen del virus recibiendo daño:

Spritesheet del virus muriendo:

#### Humanos infectados ####

##### Nivel 1 #####

##### Nivel 2 #####

##### Nivel 3 #####

##### Nivel 4 #####

##### Nivel 5 #####

##### Nivel 6 #####

#### Bosses ####

##### Nivel 1 #####

##### Nivel 2 #####

##### Nivel 3 #####

##### Nivel 4 #####

##### Nivel 5 #####

##### Nivel 6 #####

### Armas ###

### Medicinas ###

### Consumibles ###

### Tienda ###

### Elementos temporales ###

Durante las peleas contra el boss, dependiendo del nivel, pueden aparecer una serie de elmentos temporales cuya función es dificultar la partida para el jugador.

#### Agujeros negros ####

Los agujeros negros atraen hacia sí al jugador impidiendo que se desplaze libremente por la pantalla.

Duración:

Spritesheet:


## Controles ##

El jugador puede desplazarse en todas las direcciones utilzando las fechas o las teclas A, W, S, D.


