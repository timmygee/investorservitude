#!/bin/bash

source $HOME/.virtualenvs/investorservitude/bin/activate

$VIRTUAL_ENV/bin/python /$HOME/investorservitude/investorservitude/manage.py poll 2>&1 >> $HOME/poll.log

deactivate
