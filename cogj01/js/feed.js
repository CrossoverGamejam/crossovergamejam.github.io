google.load("feeds", "1"); //APIを読み込みます

function initialize(){

	var d = new Date();
	var dq = d.getMonth()+""+d.getDate()+""+d.getHours();
	var feed = new google.feeds.Feed("https://crossoverlink.wordpress.com/feed/"+"?"+dq); //読み込むRSSフィードを設定します
	var noPhoto = ("<img src='画像がなかった場合に表示する画像のURL' />"); //画像がなかった場合に表示する画像を指定します
	var body = "";
	
	feed.setNumEntries(1); //記事を読み込む件数を設定します
	feed.load(dispfeed);
	
	function dispfeed(result){

		if(!result.error){
			var container = document.getElementById("blog-feed"); //HTMLに書き出す対象のIDを指定します

			for (var i = 0; i < result.feed.entries.length; i++) {

				var entry = result.feed.entries[i];

				var entryDate = new Date(entry.publishedDate); //日付を取得します。　以下二桁処理をします
				var entryYear = entryDate.getYear();
				if (entryYear < 2000){
					entryYear += 1900;
				}
				var entryMonth = entryDate.getMonth() + 1;
				if (entryMonth < 10) {
					entryMonth = "0" + entryMonth;
				}
				var entryDay = entryDate.getDate();
				if (entryDay < 10) {
					entryDay = "0" + entryDay;
				}
				var date = "（" + entryYear + "/" + entryMonth + "/" + entryDay + "）";

				var entryImg = "";
				var imgCheck = entry.content.match(/(src="https:)[\S]+((\.jpg)|(\.JPG)|(\.jpeg)|(\.JPEG)|(\.gif)|(\.GIF)|(\.png)|(\.PNG))/); //画像のチェックをします　拡張子はここで増やします
				if(imgCheck){
					entryImg += '<img ' + imgCheck[0] + '" width="250">';
					} else {
						entryImg += noPhoto;
				}
						
				container.innerHTML += '<div style="float:left">' 
				+ entryImg
				+ '</div><div style="margin-left:260px"><h3 style="color: #000000">'
				+ '<a href="' + entry.link + '">'
				+ entry.title + '</a>'
				+ '</h3>'
				+ '<p style="color: #000000">'
				+ entry.contentSnippet.substring(0,120)
				+ ' …<a href="' + entry.link + '">more</a>'
				+ date 
				+ '</p></div>';
			}

			var linkBlank = container.getElementsByTagName('a'); // targetに'_blank'を設定します。不要な場合は、以下4行を削除
			for (var j = 0, l = linkBlank.length; j < l; j++) {
				linkBlank[j].target = '_blank';
			} //target'_blank'ここまで
			//console.log(container.innerHTML);
		}
	}
}
google.setOnLoadCallback(initialize);