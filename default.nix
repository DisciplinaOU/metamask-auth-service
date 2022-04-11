{ pkgs ? import ./pkgs.nix }:

pkgs.callPackage ./release.nix {}
