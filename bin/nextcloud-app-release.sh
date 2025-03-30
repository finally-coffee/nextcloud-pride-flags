#!/usr/bin/env bash
set -euo pipefail -o errtrace

APP_NAME="${1:-pride_flags}"
VERSION="${2:-1.1.3-rc.1}"
REPO=`pwd`
CERT_DIR="$HOME/.nextcloud/certificates"
TARBALL="$APP_NAME-$VERSION.tar.gz"
TARBALL_SIG="$TARBALL.sig"f
CONTAINER_NAME="nextcloud-app-signing-container"
CONTAINER_IMAGE="${3:-docker.io/library/nextcloud:31.0.2}"
CONTAINER_APP_LOC="/var/www/html/custom_apps/$APP_NAME"

_SLEEP="45"

traperr() {
    echo "ERROR: ${BASH_SOURCE[1]} at about ${BASH_LINENO[0]}"
    mv ../nextcloud-pride-flags-git .git
    sudo docker stop "${CONTAINER_NAME}"
    sudo docker rm "${CONTAINER_NAME}"
}
trap traperr ERR

mkdir ../nextcloud-pride-flags-tmp
mv .git ../nextcloud-pride-flags-tmp/.git
mv bin ../nextcloud-pride-flags-tmp/bin
mv vendor-bin ../nextcloud-pride-flags-tmp/vendor-bin

sudo docker run --hostname nc31.local \
    -e NEXTCLOUD_ADMIN_USER=admin \
    -e NEXTCLOUD_ADMIN_PASSWORD=admin \
    --name "${CONTAINER_NAME}" --detach \
    -v "${CERT_DIR}/:/privkey/:ro" \
    -v "${REPO}/:${CONTAINER_APP_LOC}/:rw" \
    "${CONTAINER_IMAGE}"

echo "Sleep ${_SLEEP}s for container startup"
sleep "$_SLEEP"
sudo docker exec -it ${CONTAINER_NAME} php occ integrity:sign-app \
    --path="${CONTAINER_APP_LOC}" \
    --privateKey="/privkey/${APP_NAME}.key" \
    --certificate="/privkey/${APP_NAME}.crt"

sudo docker stop "${CONTAINER_NAME}"
sudo docker rm "${CONTAINER_NAME}"

mv ../nextcloud-pride-flags-tmp/.git .git
mv ../nextcloud-pride-flags-tmp/bin bin
mv ../nextcloud-pride-flags-tmp/vendor-bin vendor-bin

echo "App $APP_NAME signed @ ${VERSION}. Commit the appinfo/signatures.json now and press enter."
read -p "Press Enter to continue" < /dev/tty

tar --exclude-vcs --exclude='./bin' --exclude='./vendor-bin' -czvf "${TARBALL}" "$REPO"

# verify content
echo "Tarball '${TARBALL}' content:"
tar -tf ${TARBALL}

echo "Tarball signature:"
# sign tarball
openssl dgst -sha512 -sign "${CERT_DIR}/${APP_NAME}.key" $TARBALL \
	| openssl base64 \
	| tee "${TARBALL_SIG}"


