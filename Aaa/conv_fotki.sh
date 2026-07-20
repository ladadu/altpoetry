echo "==== Konvertiruem papku [Aaa] ====="
mkdir -p Aaa/{img,tm}
for f in Aaa/*.jpg ; do n=$( echo $f | sed 's/^Aaa\///' )
echo -n "[$n] --> [img_$n]"
magick $f -strip -interlace Plane -quality 60 Aaa/img/img_$o
echo -n " + [tm_$n]"
magick $f -strip -interlace Plane -quality 30 -resize "x247>" Aaa/tm/tm_$t
echo " Gotovo!"
done
