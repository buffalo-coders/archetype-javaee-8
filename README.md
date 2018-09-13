# archetype-javaee-8

Apache Maven archetypes are used to quickly bootstrap projects. This project
is itself an archetype. It is used to bootstrap Java EE projects in our
preferred style.

## Usage

Generate a new project from the command line via:

```
mvn --batch-mode                                       \
    archetype:generate                                 \
    -DarchetypeGroupId=org.buffalo-coders.archetypes   \
    -DarchetypeArtifactId=javaee-8                     \
    -DgroupId=org.buffalo-coders.javaee                \
    -DartifactId=demo                                  \
    -Dversion=1.0-SNAPSHOT                             \
    -Dpackage=org.buffalo.coders.javaee.demo
```
