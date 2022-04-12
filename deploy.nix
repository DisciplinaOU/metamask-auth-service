{ pkgs ? import ./pkgs.nix }:
{
    metamask-auth-service = pkgs.callPackage ./release.nix {};
    nodejs-16_x = pkgs.nodejs-16_x;
}