#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
$symbol_pound `${groupId}:${artifactId}`

Welcome to `${groupId}:${artifactId}`!

$symbol_pound$symbol_pound Prerequisites

  * Install: [GNU Make](https://www.gnu.org/software/make/)
  * Install: [Java SE 8, or higher](http://www.oracle.com/technetwork/java/javase/)
  * Install: [Apache Maven 3.5, or higher](https://maven.apache.org/)

$symbol_pound$symbol_pound Building

  * Run: `make`

$symbol_pound$symbol_pound Testing

  * Run: `make test`

$symbol_pound$symbol_pound Running

  * Run: `make run`
  * Open: http://localhost:8080/
  * Open: http://localhost:8080/api/ping

$symbol_pound$symbol_pound Miscellaneous

This project was initially created from an archetype found at
https://github.com/buffalo-coders/archetype-javaee-8
