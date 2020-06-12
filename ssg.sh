#!/bin/bash
# Reads in the index.html and data.json
# file and 'pre-renders' the HTML page
# so that this can be served statically
# and doesnt run any javascript on the
# users machine
#
# on my server I do: ./ssg.sh && mv static.html index.html
#
# requies: jq

generate_html() {
	# parse JSON line delimited info
	DATA_LINES=$(jq -r 'to_entries[] | "\(.key) \(.value | .img_url)"' <data.json)
	while IFS= read -r info; do
		# split into arr
		IFS=' ' read -r -a arr <<<"$info"
		printf '<figure class="p-2 text-center"><a href="%s"><img src="%s"></a><figcaption><a class="mt-1 badge badge-pill" href="https://xkcd.com/%d">https://xkcd.com/%d</a></figcaption></figure>\n' "${arr[1]}" "${arr[1]}" "${arr[0]}" "${arr[0]}"
	done<<<"$DATA_LINES"
}

while IFS= read -r line; do
	if [[ "$line" == *"noscript"* ]]; then
		# replace the noscript line with a
		# pre-rendered page
    generate_html
	elif [[ "$line" == *"<script"* ]]; then
		# do nothing, remove javascript lines
    : # noop
	else
		echo "$line"
	fi
done <./index.html >static.html
