import { lib, game, ui, get, ai, _status } from "noname";

const dynamicTranslates = {
	huamao_wushen(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Kỹ năng cố định. ①Các thẻ ${suit} của bạn đều được coi là【Sát】. ②Bạn sử dụng thẻ ${suit}【Sát】không có giới hạn khoảng cách và số lần và không thể được đáp ứng.`;
	},
	huamao_liushi(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Giai đoạn xuất bài, bạn có thể đặt một thẻ ${suit} trên cùng bộ bài, được coi là sử dụng một【Sát】cho một nhân vật khác (không có giới hạn khoảng cách và không tính vào số lần sử dụng). Sau khi【Sát】này gây ra sát thương, nhân vật bị sát thương nhận được một "Lưu". Nhân vật có "Lưu" giảm tối đa thẻ bằng X (X là số "Lưu" của họ).`;
	},
	huamao_gongxin(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Giai đoạn xuất bài giới hạn một lần, bạn có thể xem thẻ tay của một nhân vật khác và có thể hiển thị một thẻ ${suit} trong đó, sau đó loại bỏ nó hoặc đặt nó trên cùng bộ bài.`;
	},
	huamao_tianxiang(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Khi bạn nhận sát thương, bạn có thể loại bỏ một thẻ ${suit} trong tay, ngăn chặn sát thương này và chọn một nhân vật khác, sau đó bạn chọn một tùy chọn: 1. Khiến họ nhận 1 điểm sát thương từ nguồn gây sát thương, sau đó rút X thẻ (X là giá trị sinh lực đã mất của họ và tối đa là 5); 2. Khiến họ mất 1 điểm sinh lực, sau đó nhận thẻ bạn đã loại bỏ.`;
	},
	huamao_guose(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Giai đoạn xuất bài giới hạn một lần, bạn có thể chọn một tùy chọn: Sử dụng một thẻ ${suit} như【Lạc Bất Tư Thục】; hoặc loại bỏ một thẻ ${suit} và loại bỏ một【Lạc Bất Tư Thục】trên sân. Sau khi chọn xong, bạn rút một thẻ.`;
	},
	huamao_limu(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Giai đoạn xuất bài, bạn có thể sử dụng một thẻ ${suit} như【Lạc Bất Tư Thục】cho chính mình, sau đó hồi phục 1 điểm sinh lực. Miễn là khu vực phán xét của bạn có thẻ, việc bạn sử dụng thẻ cho các nhân vật khác trong phạm vi tấn công sẽ không có giới hạn số lần và khoảng cách.`;
	},
	huamao_fengpo(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Mỗi tên thẻ giới hạn một lần. Khi bạn chỉ định mục tiêu cho【Sát】hoặc【Quyết Đấu】đầu tiên mỗi lượt, nếu số lượng nhân vật mục tiêu là 1, bạn có thể chọn một tùy chọn: 1. Rút X thẻ, làm cho giá trị sát thương cơ bản của thẻ này tăng +1; 2. Rút một thẻ, làm cho giá trị sát thương cơ bản của thẻ này tăng +X (X là số lượng thẻ ${suit} của họ).`;
	},
	huamao_jiexun(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Giai đoạn kết thúc, bạn có thể khiến một nhân vật khác rút số thẻ bằng số thẻ ${suit} trên sân, sau đó loại bỏ X thẻ (X là số lần kỹ năng này đã phát động). Nếu có nhân vật loại bỏ tất cả các thẻ bằng cách này, thì bạn đặt lại X bằng 0, sau đó khi bạn phát động〖Phục Nan〗, bạn không cần khiến đối phương nhận thẻ bạn sử dụng.`;
	},
	huamao_leiji(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Khi bạn sử dụng hoặc bỏ một【Thiểu】, bạn có thể khiến bất kỳ một nhân vật nào thực hiện một lần phán xét. Nếu kết quả là ${suit}, họ nhận 2 điểm sát thương sét.`;
	},
	huamao_zuoding(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Khi nhân vật khác sử dụng thẻ ${suit} chỉ định mục tiêu trong lượt của họ, nếu không có nhân vật nào bị sát thương trong lượt này, thì bạn có thể khiến một trong các nhân vật mục tiêu rút một thẻ.`;
	},
	huamao_miehai(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Bạn có thể sử dụng hai thẻ như xuyên【Sát】không có giới hạn khoảng cách và số lần. Sau khi【Sát】này được tính toán hoàn thành, các nhân vật mất thẻ ${suit} tích cực và đã bị thương trong quá trình này rút hai thẻ và hồi phục 1 điểm sinh lực.`;
	},
	huamao_jiyu(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Giai đoạn xuất bài giới hạn một lần, bạn có thể khiến một nhân vật loại bỏ một thẻ tay. Nếu làm vậy, bạn không thể sử dụng thẻ cùng chất, cho đến hết lượt. Nếu thẻ họ loại bỏ bằng cách này là ${suit}, bạn lộn mặt và khiến họ mất 1 điểm sinh lực. Nếu bạn có thẻ tay không bị〖Kỉ Gièn〗giới hạn, thì bạn có thể tiếp tục phát động kỹ năng này, nhưng không thể chọn mục tiêu đã được chọn trong lượt này.`;
	},
	huamao_luoying(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Khi thẻ ${suit} của nhân vật khác vào bộ bài loại bỏ do bị loại bỏ hoặc phán xét, bạn có thể nhận được nó.`;
	},
	huamao_lianhuan(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Bạn có thể sử dụng hoặc sửa chế thẻ ${suit} trong tay như【Tiết Xích Liên Hoàn】.`;
	},
	huamao_zhujiu(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Bạn có thể sử dụng ít nhất X+1 thẻ như【Rượu】(X là số lần bạn đã sử dụng【Rượu】trong lượt này), sau đó nếu những thẻ này tồn tại thẻ không phải ${suit}, kỹ năng này không có hiệu lực cho đến hết lượt.`;
	},
	huamao_ninghan(player, skill) {
		const suit = get.translation(get.info("wxdl_huamao").getSuit(player, skill));
		return `Kỹ năng cố định. ①Tất cả【Sát】${suit}trong thẻ tay của mọi nhân vật đều được coi là đá【Sát】. ②Khi một nhân vật nhận sát thương cấp đông sau, bạn đặt thẻ vật lý tương ứng với bài gây sát thương vào "Thành".`;
	},
	eu_zhitong(player) {
		const bool = player.storage.eu_zhitong;
		let yang = "Chính mình, rút hai thẻ và hồi phục 1 điểm sinh lực",
			yin = "Nhân vật khác, bạn nhận tất cả các thẻ trong khu vực trang bị của họ và gây 1 điểm sát thương cho họ";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi, khi bạn sử dụng thẻ, nếu mục tiêu bao gồm, ",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	peyuanjue(player) {
		const bool = player.storage.peyuanjue;
		let yang = "Khiến tất cả thẻ cơ bản của các nhân vật được coi là【Sát】không có giới hạn số lần",
			yin = "Khiến tất cả các nhân vật và bạn tính toán khoảng cách lẫn nhau là 1, và bạn được coi là sở hữu〖Đồng Khải〗";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi. Khi giai đoạn rút thẻ bắt đầu, bạn có thể bỏ qua giai đoạn rút thẻ, ",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	yjjiechu(player) {
		const bool = player.getStorage("yjjiechu", false);
		let yang = "Giai đoạn xuất bài, bạn có thể được coi là sử dụng【Thuận Tay Khiên Dương】, sau khi tính toán kết thúc, nhân vật mục tiêu có thể sử dụng【Sát】cho bạn",
			yin = "Khi bạn trở thành mục tiêu của【Sát】, bạn có thể loại bỏ một thẻ tay để thay đổi chất và thuộc tính của【Sát】";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi。",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	scls_miaojian(player) {
		if (player.hasMark("scls_miaojian")) {
			return "Giai đoạn xuất bài giới hạn một lần, bạn có thể được coi là sử dụng xuyên【Sát】hoặc【Vô Trung Sinh Hữu】.";
		}
		return "Giai đoạn xuất bài giới hạn một lần, bạn có thể sử dụng một thẻ cơ bản như xuyên【Sát】, hoặc sử dụng một thẻ không phải cơ bản như【Vô Trung Sinh Hữu】.";
	},
	scls_lianhua(player) {
		if (player.hasMark("scls_lianhua")) {
			return "Khi bạn trở thành mục tiêu của【Sát】, bạn rút một thẻ. Sau đó người sử dụng【Sát】này cần loại bỏ một thẻ, nếu không【Sát】này không có hiệu lực với bạn.";
		}
		return "Khi bạn trở thành mục tiêu của【Sát】, bạn rút một thẻ.";
	},
	jdjuqi(player) {
		const bool = player.storage.jdjuqi;
		let yang = "Bạn rút ba thẻ; giai đoạn chuẩn bị của nhân vật khác, họ có thể hiển thị và giao cho bạn một thẻ tay màu đen",
			yin = "Bạn khiến bạn sử dụng thẻ trong lượt này không có giới hạn số lần và sát thương gây ra tăng +1; giai đoạn chuẩn bị của nhân vật khác, họ có thể hiển thị và giao cho bạn một thẻ tay màu đỏ";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi. Giai đoạn chuẩn bị, ",
			end = "。";
		return `${start}Dương: ${yang}. Âm: ${yin}${end}`;
	},
	jdlongdan(player) {
		return lib.translate["jdlongdan" + (player.hasSkill("sblongdan_mark", null, null, false) ? "x" : "") + "_info"];
	},
	tylongnu(player) {
		const bool = player.hasSkill("tylongnu_yang") || (player.storage.tylongnu && !player.hasSkill("tylongnu_yin"));
		let yang = "Mất 1 điểm sinh lực, sau đó trong giai đoạn này bạn có thể sử dụng hoặc bỏ thẻ tay màu đỏ như lửa【Sát】không có giới hạn khoảng cách",
			yin = "Giảm 1 điểm tối đa sinh lực, sau đó trong giai đoạn này bạn có thể sử dụng hoặc bỏ thẻ錦囊 như sét【Sát】không có giới hạn số lần";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi. Khi trò chơi bắt đầu, bạn có thể thay đổi trạng thái của kỹ năng chuyển đổi này. Giai đoạn xuất bài bắt đầu, bạn có thể rút một thẻ và: ",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	tyqianshou(player) {
		const bool = player.storage.tyqianshou;
		let yang = "Bạn có thể hiển thị và giao cho họ một thẻ màu đỏ, trong lượt này bạn không thể sử dụng thẻ tay và bạn với họ không thể trở thành mục tiêu của thẻ",
			yin = "Bạn có thể khiến họ hiển thị và giao cho bạn một thẻ, nếu thẻ này không phải màu đen, bạn mất 1 điểm sinh lực";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi. Khi lượt của nhân vật khác bắt đầu, nếu sinh lực của họ lớn hơn bạn, hoặc họ không ở trạng thái ngang, ",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	tyliupo(player) {
		const bool = player.storage.tyliupo;
		let yang = "Tất cả nhân vật không thể sử dụng【Đào】",
			yin = "Tất cả sát thương sắp xảy ra đều được coi là mất sinh lực";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi. Khi vòng bắt đầu, bạn khiến vòng này: ",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	yyyanggu(player) {
		const bool = player.storage.yyyanggu;
		let yang = "Khi bạn nhận sát thương, bạn có thể hồi phục 1 điểm sinh lực",
			yin = "Bạn có thể sử dụng một thẻ tay như【Thanh Đông Kích Tây】";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi。",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	hm_shice(player) {
		const bool = player.storage.hm_shice;
		let yang = "Khi bạn nhận sát thương có thuộc tính, nếu số lượng kỹ năng của bạn không vượt quá nguồn gây sát thương, bạn có thể ngăn chặn sát thương này và được coi là sử dụng【Hỏa Công】",
			yin = "Khi bạn không vì kỹ năng này sử dụng thẻ chỉ định mục tiêu duy nhất, bạn có thể khiến họ loại bỏ bất kỳ thẻ nào trong khu vực trang bị, sau đó thẻ này được tính toán thêm X lần (X là số thẻ trong khu vực trang bị của họ)";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi. ",
			end = "。";
		return `${start}Dương：${yang}；Âm：${yin}${end}`;
	},
};
export default dynamicTranslates;
