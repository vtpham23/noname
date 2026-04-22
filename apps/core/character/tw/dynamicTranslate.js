import { lib, game, ui, get, ai, _status } from "noname";

const dynamicTranslates = {
	twfeifu(player) {
		const bool = player.storage.twfeifu;
		let yang = "Khi bạn trở thành mục tiêu duy nhất của 【Sát】",
			yin = "Khi bạn chỉ định mục tiêu duy nhất sau khi sử dụng 【Sát】";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng cố định, kỹ năng chuyển đổi.",
			end = "，nhân vật mục tiêu phải giao cho người sử dụng một lá bài. Nếu lá bài này là lá bài trang bị, người sử dụng có thể sử dụng lá bài này.";
		return `${start}Dương：${yang}；Âm：${yin}${end}`;
	},
	twfengpo(player) {
		if (player.storage.twfengpo) {
			return "Khi bạn chỉ định mục tiêu duy nhất sau khi sử dụng 【Sát】hoặc 【Quyết Đấu】, bạn có thể xem lá bài trên tay của nhân vật mục tiêu và chọn một mục: ⒈Rút X lá bài. ⒉Làm cho giá trị sát thương cơ bản của lá bài này +X (X là số lá bài màu đỏ trong lá bài trên tay của nó).";
		}
		return "①Khi bạn chỉ định mục tiêu duy nhất sau khi sử dụng 【Sát】hoặc 【Quyết Đấu】, bạn có thể xem lá bài trên tay của nhân vật mục tiêu và chọn một mục: ⒈Rút X lá bài. ⒉Làm cho giá trị sát thương cơ bản của lá bài này +X (X là số ♦ trong lá bài trên tay của nó). ②Khi bạn giết chết một nhân vật, bạn sẽ thay đổi "số ♦" trong 〖Phượng Phách①〗 thành "số lá bài màu đỏ".";
	},
	twjiexun(player) {
		return lib.translate[player.hasSkill("funan_jiexun") ? "twjiexunx_info" : "twjiexun_info"];
	},
	twzhenliang(player) {
		const bool = player.storage.twzhenliang;
		let yang = "Giai đoạn sử dụng bài, giới hạn một lần. Bạn có thể bỏ một lá bài và gây 1 điểm sát thương cho một nhân vật trong tầm tấn công của bạn",
			yin = "Khi bạn hoặc một nhân vật trong tầm tấn công của bạn nhận được sát thương ngoài lượt của bạn, bạn có thể bỏ một lá bài để làm cho sát thương này giảm 1. Sau đó, nếu lá bài bạn bỏ theo cách này có cùng màu sắc với "Nhân", bạn sẽ rút một lá bài";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi.",
			end = "。";
		return `${start}Dương：${yang}；Âm：${yin}${end}`;
	},
	twdengjian(player) {
		let str = "①Khi kết thúc giai đoạn bỏ bài của các nhân vật khác, bạn có thể ngẫu nhiên lấy một 【Sát】có màu sắc khác với tất cả 【Sát】bạn đã lấy theo cách này trong lượt này và tương ứng với một trong các lá bài gây sát thương trong lượt này, gọi là "Kiếm Pháp".";
		if (player.isTempBanned("twdengjian")) {
			str = '<span style="opacity:0.5">' + str + "</span>";
		}
		str += "②Bạn sử dụng lá bài "Kiếm Pháp" không tính trong giới hạn lần sử dụng.";
		return str;
	},
	twduwang(player) {
		let str = "Kỹ năng sứ mệnh.";
		if (!player.storage.twduwang_fail) {
			str += "①";
		}
		str += "Vào đầu giai đoạn sử dụng bài, bạn có thể chọn tối đa ba nhân vật khác có bài, rút X lá bài (X là số nhân vật được chọn + 1), sau đó những nhân vật này lần lượt sử dụng một lá bài như 【Quyết Đấu】đối với bạn.";
		if (!player.storage.twduwang_fail) {
			str += `\
			②Khi bạn ở trạng thái gần chết, những nhân vật khác không thể sử dụng 【Đào】đối với bạn.\
			③Sứ mệnh: Tổng số lần sử dụng 【Quyết Đấu】hoặc trở thành mục tiêu của 【Quyết Đấu】không nhỏ hơn 4 (nếu tổng số người chơi dưới 4 thì đổi thành 3).\
			④Thành công: Giai đoạn chuẩn bị, nếu bạn đã hoàn thành sứ mệnh 〖Độc Vãng③〗 trong lượt trước của mình, bạn sẽ đặt lại 〖Độc Vãng〗 và sửa đổi 〖Độc Vãng〗 để chỉ giữ lại hiệu ứng của 〖Độc Vãng①〗, chọn một mục: ⒈Có được 〖Hiệp Dũng〗；⒉Đặt lại 〖Kéo Thế〗 và cho phép nó có được hiệu ứng chiến đấu lịch sử.\
			⑤Thất bại: Khi bạn chết, sứ mệnh thất bại.`;
		}
		return str;
	},
	twylyanshi(player) {
		return lib.translate[(player.storage.twduwang_ylyanshi ? "twylyanshix" : "twylyanshi") + "_info"];
	},
	twjielv(player) {
		if (player.storage.isInHuan) {
			return lib.translate.twjielvx_info;
		}
		return lib.translate.twjielv_info;
	},
	twbeiding(player) {
		if (player.storage.isInHuan) {
			return lib.translate.twbeidingx_info;
		}
		return lib.translate.twbeiding_info;
	},
};
export default dynamicTranslates;

