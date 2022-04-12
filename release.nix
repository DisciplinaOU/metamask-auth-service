{ buildYarnPackage
, constGitIgnore
, fetchFromGitHub
}:

buildYarnPackage {
    src = ./.;
    # packageOverrides = [
    #     (final: previous: {
    #         "express-jwt@https://github.com/flyingleafe/express-jwt#d068e63e9a41e5da79728572ebcb71d471eda073" = fetchFromGitHub {
    #             owner = "flyingleafe";
    #             repo = "express-jwt";
    #             rev = "d068e63e9a41e5da79728572ebcb71d471eda073";
    #             sha256 = "sha256:0000000000000000000000000000000000000000000000000000";
    #         };
    #     })
    # ];
}
