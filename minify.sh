#!/bin/bash
PREF_DIR=/home/arseni/Documents/web/jsLibs

COMPRESSOR=$PREF_DIR/compressor/yuicompressor-2.4.8.jar


function compress() {
	file=`echo $1 | sed 's/.js//'`
	java -jar  $COMPRESSOR $file.js -o $file.min.js --charset utf-8
	min=`stat -c '%s' $file.min.js`
	norm=`stat -c '%s' $file.js`
	win=$(($norm-$min))
	total_win=$(($total_win+$win))
	printf "[ %15s (%6d bytes) > %20s (%6d bytes)] [win: %6d bytes]\n" $file.js $norm $file.min.js $min $win

}
[ $@ ] && files=$@ || files=`ls *[^.min].js`
for F in $files;do
	compress $F
done

[ "$files" ] || exit
printf "===============================================================================================\n"	
printf "Total win: %d bytes.\n" $total_win
