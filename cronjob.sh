#!/bin/sh
cd `dirname $0`
nice php -q mk_rss.php > dudley.rss
