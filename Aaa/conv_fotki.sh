echo "==== Konvertiruem papku [Aaa] ====="
mkdir -p Aaa/{img,tm}
for f in Aaa/*.jpg ; do n=$( echo $f | sed 's/^Aaa\///' )
echo -n "[$n] --> [img/$n]"
magick $f -strip -interlace Plane -quality 60 -rotate 90 Aaa/img/$n
echo -n " + [tm_$n]"
magick $f -strip -interlace Plane -quality 60 -rotate 90 -resize "x247>" Aaa/tm/tm_$n
echo " Gotovo!"
done
