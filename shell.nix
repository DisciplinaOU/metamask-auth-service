{ pkgs ? import ./pkgs.nix }:

with pkgs;

mkShell {
  nativeBuildInputs = [
    nodejs
    yarn
  ];

  shellHook = ''
    export PATH=$PWD/node_modules/.bin:$PWD/packages/backend/node_modules/.bin:$PWD/packages/frontend/node_modules/.bin:$PATH
    
    echo "SELECT 'CREATE DATABASE disciplina_metamask_login' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db')\gexec" | sudo -u postgres psql 
  '';
}
