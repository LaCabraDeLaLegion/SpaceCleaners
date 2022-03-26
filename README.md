# Space Cleaners #

Space Cleaners es un juego desarrollado con Phaser para la asignatura optativa DVI impartida en la Facultad de Informática de la Universidad Complutense de Madrid. La idea original del juego está basada en juegos de tipo arcade como el Space Invaders.

(CAPTURA DE PANTALLA DEL JUEGO)

Enlace para probar el juego: [https://lacabradelalegion.github.io/SpaceCleaners/proyecto_phaser/index.html](https://lacabradelalegion.github.io/SpaceCleaners/proyecto_phaser/index.html)

Enlace a la página pública del juego: [https://lacabradelalegion.github.io/SpaceCleaners/index.html](https://lacabradelalegion.github.io/SpaceCleaners/index.html)

AVISO: Todo este contenido puede verse también e nla página pública del juego.

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

## Mecáncias ##

### Mapa ###

El jugador deberá decidir qué planeta va a intentar desinfectar. Para ello dispone de un mapa en el que se muestran todos los planetas así como su estado (infectado o desinfectado) y si está desbloqueado o no.

Al comienzo de la partida, el mapa mostrará todos los planetas menos la Tierra como infectados. Además, el único planeta desbloqueado (posible desinfectar) es el planeta más cercano a la Tierra correspondiente al nivel 1. Cada planeta tiene un nivel de dificultad distinto y están ordenados en el mapa por nivel de dificultad utiliznado la Tierra como referencia.

Aspecto inicial del mapa:
(CAPTURA DE PANTALLA DEL MAPA)

Según el jugador va desinfectando niveles el siguiente nivel se desbloquea. Adicionalmente, tras cada batalla el virus tiene la posibilidad de reinfectar un planeta (la probabilidad de que esto sucede depende del nivel de dificultad del juego seleccionado por el jugador). Para que el jugador tenga la posibilidad de adaptarse al juego se dan unas rondas de tregua en las que los virus no reinfectan planetas (cuántas dependerá del nivel de dificutlad).

Por ejemplo, el jugador puede haber desinfectado los niveles 1, 2 y 3 pero los virus han reinfectado el planeta número 2 en el mismo turno quedando el mapa de la siguiente manera:
(CAPTURA DE PANTALLA DEL MAPA)

### Enemigos ###

Hay dos etapas en cada ronda: desinfección del virus y pelea con el boss. En la primera etapa, el jugador deberá eliminar a todos los enemigos antes de que éstos lleguen al final de la pantalla (alcancen a las tropas). Una vez todos los enemigos son eliminados entra en escena el boss final (diferente para cada nivel). Para ganar la partida el jugador deberá bajar la vida del boss a 0 y eliminarlo. Por su parte el boss lanza ataques al jugador que le irán quitando vida. Si el jugador pierde toda su vida pierde la partida.

En la primera etapa hay dos tipos diferentes de enemigos: virus mutados y humanos infectados. El objetivo es eliminar los virus mutados utilizando armas y desinfectar a los humanos utilizando medicinas. Si se utiliza el arma sobre un humano mutará conviertiéndose en un virus de mayor nivel cuyo movimiento pasará a ser vertical. Lo mismo sucede si se ataca con una medicina a un virus. (Para más detalles sobre el funcionamiento de las mutaciones de los enemigos por acciones incorrectas acceder al GDD completo).

#### Virus mutados ####


#### Humanos infectados ####

#### Bosses ####

### Armas ###

### Medicinas ###

### Consumibles ###

### Tienda ###

## Controles ##

El jugador puede desplazarse en todas las direcciones utilzando las fechas o las teclas A, W, S, D.


