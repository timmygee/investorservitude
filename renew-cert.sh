#!/bin/bash

set -x

if ! $HOME/letsencrypt/letsencrypt-auto renew --agree-tos  > $HOME/letsencrypt-renew.log 2>&1 ; then
    echo Automated renewal failed:
    cat $HOME/letsencrypt-renew.log
    set +x
    exit 1
else
    if ! sudo /usr/sbin/nginx -t >> $HOME/letsencrypt-renew.log 2>&1 ; then
	echo nginx config invalid, not reloading service
	cat $HOME/letsencrypt-renew.log
	set +x
	exit 1
    else
	sudo service nginx reload
	set +x
    fi
fi
