{ buildYarnPackage
, constGitIgnore
, fetchurl
}:

buildYarnPackage { src = ./.; }
