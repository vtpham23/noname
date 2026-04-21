import { lib, game, ui, get, ai, _status } from "noname";

const dynamicTranslates = {
	starchongzu(player) {
		if (player.getStorage("starchongzu", false)) {
			return lib.translate["starchongzu_rewrite_info"];
		}
		return lib.translate["starchongzu_info"];
	},
	mubing(player) {
		if (player.storage.mubing2) {
			return "Khi bắt đầu giai đoạn ra bài, bạn có thể lật sáng bốn lá bài từ trên cùng xấp bài. Bạn có thể vứt bỏ số lá bài bất kỳ trên tay, và có thể nhận số lá bài bất kỳ có tổng điểm không lớn hơn tổng điểm của các lá bài bạn đã vứt bỏ. Sau đó bạn có thể đem số bài nhận được theo cách này đưa cho các nhân vật khác theo cách bất kỳ.";
		}
		return "Khi bắt đầu giai đoạn ra bài, bạn có thể lật sáng ba lá bài từ trên cùng xấp bài. Bạn có thể vứt bỏ số lá bài bất kỳ trên tay, và có thể nhận số lá bài bất kỳ có tổng điểm không lớn hơn tổng điểm của các lá bài bạn đã vứt bỏ.";
	},
	piaoping(player) {
		const bool = player.storage.piaoping;
		let yang = "bạn rút X lá bài",
			yin = "bạn vứt bỏ X lá bài";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Chuyển hoán kỹ, Tỏa định kỹ. Khi bạn sử dụng một lá bài, ",
			end = " (X là số lần bạn đã phát động 〖Phiêu Bình〗 trong giai đoạn này và tối đa bằng trị số thể lực của bạn).";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	zhuili(player) {
		if (!player.hasSkill("piaoping", null, null, false)) {
			return "Tỏa định kỹ. Khi bạn trở thành mục tiêu của lá bài màu đen do nhân vật khác sử dụng, nếu 〖Phiêu Bình〗 của bạn: đang ở trạng thái Dương, thì bạn chuyển 〖Phiêu Bình〗 sang trạng thái Âm; đang ở trạng thái Âm, thì bạn khiến số lần phát động 〖Thác Hiến〗 +1, sau đó nếu số lần phát động 〖Thác Hiến〗 lớn hơn 3, thì 〖Chủy Lật〗 vô hiệu trong hiệp này.";
		}
		if (player.storage.piaoping) {
			return 'Tỏa định kỹ. Khi bạn trở thành mục tiêu của lá bài màu đen do nhân vật khác sử dụng, nếu 〖Phiêu Bình〗 của bạn: <span class="bluetext">đang ở trạng thái Dương, thì bạn chuyển 〖Phiêu Bình〗 sang trạng thái Âm;</span> đang ở trạng thái Âm, thì bạn khiến số lần phát động 〖Thác Hiến〗 +1, sau đó nếu số lần phát động 〖Thác Hiến〗 lớn hơn 3, thì 〖Chủy Lật〗 vô hiệu trong hiệp này.';
		}
		return 'Tỏa định kỹ. Khi bạn trở thành mục tiêu của lá bài màu đen do nhân vật khác sử dụng, nếu 〖Phiêu Bình〗 của bạn: đang ở trạng thái Dương, thì bạn chuyển 〖Phiêu Bình〗 sang trạng thái Âm; <span class="bluetext">đang ở trạng thái Âm, thì bạn khiến số lần phát động 〖Thác Hiến〗 +1, sau đó nếu số lần phát động 〖Thác Hiến〗 lớn hơn 3, thì 〖Chủy Lật〗 vô hiệu trong hiệp này.</span>';
	},
	dcdouzhen(player) {
		const bool = player.countMark("dcdouzhen") % 2;
		let yang = "các lá bài Cơ bản màu đen đều xem là 【Quyết Đấu】, trong hiệp của bạn: khi bạn sử dụng 【Quyết Đấu】 không phải dạng chuyển hóa và có lá bài thực thể tương ứng là một lá bài Cơ bản màu đen, bạn nhận của mỗi nhân vật mục tiêu một lá bài và nhận 1 dấu ấn “☯”",
			yin = "các lá bài Cơ bản màu đỏ đều xem là 【Sát】 thường không giới hạn số lần sử dụng, trong hiệp của bạn: khi bạn sử dụng hoặc đánh ra 【Sát】 không phải dạng chuyển hóa và có lá bài thực thể tương ứng là một lá bài Cơ bản màu đỏ, bạn nhận 1 dấu ấn “☯”";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Tỏa định kỹ. Chuyển hoán kỹ. Các lá bài ",
			end = " của bạn.";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
};

export default dynamicTranslates;
