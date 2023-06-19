#!/bin/bash
cd /home/jive/sync_SP/
php get_pers.php --action sync  >> logs/$(date +%F-%H)-log.log
exit 0
