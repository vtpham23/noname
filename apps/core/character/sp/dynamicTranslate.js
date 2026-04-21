import { lib, game, ui, get, ai, _status } from "noname";

const dynamicTranslates = {
	olfenyue(player, skill) {
		const bool = player.storage[skill];
		let yang = "rút hai lá bài",
			yin = "sử dụng một lá 【Sát】";
		if (!bool) {
			yang = `<span class=firetext>${yang}</span>`;
		} else {
			yin = `<span class=bluetext>${yin}</span>`;
		}
		const start = "Chuyển hoán kỹ, khi kết thúc mỗi hiệp, nếu hiệp này có nhân vật chịu sát thương thuộc tính, bạn có thể:",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	olchunhui(player, skill) {
		const bool = player.storage[`${skill}_rewrite`];
		return `Tỏa định kỹ, sau khi lá bài đầu tiên của mỗi vòng được sử dụng, nếu lá bài này là: ${bool? "màu đen" : "màu đỏ"}, bạn hồi 1 điểm thể lực; màu đen, bạn rút một lá bài.`;
	},
	olxiasheng(player, skill) {
		const bool = player.storage[`${skill}_rewrite`];
		return `Giai đoạn chuẩn bị hoặc sau khi bạn chịu sát thương, khiến một nhân vật khác đưa bạn một lá bài. Nếu lá bài này màu đen, lần tới bạn và người đó sử dụng bài ${bool? "màu đen" : "màu đỏ"} trong vòng này, có thể tăng hoặc giảm một mục tiêu cho lá bài đó (giảm tối đa còn 1).`;
	},
	olxiasheng(player, skill) {
		const bool = player.storage[`${skill}_rewrite`];
		return `Tỏa định kỹ, sau khi bạn thoát khỏi trạng thái gần chết, bạn trọng chú tất cả bài ${bool? "màu đen" : "màu đỏ"}, và đổi tất cả chữ “màu đỏ” trong mô tả kỹ năng ${get.poptip("olchunhui")}${get.poptip("olxiasheng")}〖Thu Mộ〗 thành “màu đen”.`;
	},
	olwenyi(player) {
		let info = lib.translate["olwenyi_info"],
			limit = 1 + player.countMark("olwenyi_limit");
		return info.replace("一", get.cnNumber(limit));
	},
	/*olqiaowu(player){
		const bool = player.storage.olqiaowu;
		let yang = "rút một lá bài",
			yin = "chọn có sử dụng một lá 【Sát】 hay không";
		if (!bool) {
			yang = `<span class=firetext>${yang}</span>`;
		} else {
			yin = `<span class=bluetext>${yin}</span>`;
		}
		const start = "Chuyển hoán kỹ, mỗi hiệp giới hạn một lần, sau khi lá 【Sát】 hoặc 【Thiểm】 bạn sử dụng kết toán xong, bạn có thể khiến tất cả nhân vật trong trạng thái 【Tửu】:",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},*/
	shanduan(player) {
		if (player.storage.shanduan) {
			return "Tỏa định kỹ. ① Khi bắt đầu giai đoạn rút bài/ra bài/bỏ bài, bạn phân bổ các giá trị cho số lá bài rút trong giai đoạn rút bài/tầm tấn công và giới hạn số lần sử dụng 【Sát】/giới hạn bài trên tay của hiệp này từ mảng R=[" + get.translation(player.storage.shanduan) + "]. ② Sau khi bạn chịu sát thương ngoài hiệp của mình, bạn khiến giá trị nhỏ nhất trong tập hợp giá trị R được phân bổ theo cách này của 〖Thiện Đoán ①〗 hiệp sau +1.";
		}
		return "Tỏa định kỹ. ① Khi bắt đầu giai đoạn rút bài/ra bài/bỏ bài, bạn phân bổ các giá trị cho số lá bài rút trong giai đoạn rút bài/tầm tấn công và giới hạn số lần sử dụng 【Sát】/giới hạn bài trên tay của hiệp này từ mảng R=[1, 2, 3, 4]. ② Sau khi bạn chịu sát thương ngoài hiệp của mình, bạn khiến giá trị nhỏ nhất trong tập hợp giá trị R được phân bổ theo cách này của 〖Thiện Đoán ①〗 hiệp sau +1.";
	},
	kunfen(player) {
		if (player.storage.kunfen) {
			return "Khi bắt đầu giai đoạn kết thúc, bạn có thể mất 1 điểm thể lực, sau đó rút hai lá bài.";
		}
		return "Tỏa định kỹ, khi bắt đầu giai đoạn kết thúc, bạn mất 1 điểm thể lực, sau đó rút hai lá bài.";
	},
	jieyuan(player) {
		var str = "Khi bạn gây sát thương cho một nhân vật khác, ";
		if (!player.hasSkill("fenxin_fan")) {
			str += "nếu trị số thể lực của người đó lớn hơn hoặc bằng trị số thể lực của bạn, ";
		}
		str += "bạn có thể vứt bỏ một lá bài ";
		if (!player.hasSkill("fenxin_nei")) {
			str += "trên tay màu đen";
		}
		str += ", khiến sát thương này +1; khi bạn chịu sát thương do một nhân vật khác gây ra, ";
		if (!player.hasSkill("fenxin_zhong")) {
			str += "nếu trị số thể lực của người đó lớn hơn hoặc bằng trị số thể lực của bạn, ";
		}
		str += "bạn có thể vứt bỏ một lá bài ";
		if (!player.hasSkill("fenxin_nei")) {
			str += "trên tay màu đỏ";
		}
		str += ", khiến sát thương này -1.";
		return str;
	},
	youlong(player) {
		const bool = player.storage.youlong;
		let yang = "lá Cẩm nang thường",
			yin = "lá bài Cơ bản";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Chuyển hoán kỹ. Mỗi vòng mỗi hạng mục giới hạn một lần, bạn có thể phế trừ một ô trang bị của mình, xem như sử dụng một lá bài chưa từng được sử dụng theo cách này:",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	luochong(player) {
		var storage = player.getStorage("luochong");
		var str = "Khi bắt đầu giai đoạn chuẩn bị/Khi bạn lần đầu chịu sát thương trong một hiệp, bạn có thể chọn một hạng mục chưa được chọn trong vòng này (mỗi nhân vật mỗi vòng giới hạn chọn một lần):";
		var choiceList = ["⒈ Khiến một nhân vật hồi 1 điểm thể lực.", "⒉ Khiến một nhân vật mất 1 điểm thể lực.", "⒊ Khiến một nhân vật vứt bỏ hai lá bài.", "⒋ Khiến một nhân vật rút hai lá bài."];
		for (var i = 0; i < 4; i++) {
			if (storage.includes(i)) {
				choiceList[i] = '<span style="text-decoration: line-through;">' + choiceList[i] + "</span>";
			}
			str += choiceList[i];
		}
		return str;
	},
	spmanwang(player) {
		var num = 4 - player.countMark("spmanwang");
		var str = "Giai đoạn ra bài, bạn có thể vứt bỏ số lá bài bất kỳ. Sau đó bạn lần lượt thực thi các hạng mục đầu tiên tương ứng với số lượng đó trong các lựa chọn sau:";
		var list = ["⒈ Nhận được 〖Phản Xâm〗.", "⒉ Rút một lá bài.", "⒊ Hồi 1 điểm thể lực.", "⒋ Rút hai lá bài và mất đi 〖Phản Xâm〗."];
		for (var i = 0; i < 4; i++) {
			if (i == num) {
				str += '<span style="text-decoration: line-through;">';
			}
			str += list[i];
		}
		if (num < 4) {
			str += "</span>";
		}
		return str;
	},
	olbixin(player) {
		var count = player.countMark("olbixin");
		if (count < 3) {
			return lib.translate.olbixin_info.slice(count * 5);
		}
		return "Bạn có thể tuyên bố một loại bài (mỗi loại giới hạn [3] lần), và chọn một loại bài Cơ bản có mục tiêu hợp lệ mà bạn chưa sử dụng trong vòng này. Bạn rút [1] lá bài, sau đó nếu bạn có lá bài trên tay thuộc loại này, bạn xem tất cả bài trên tay thuộc loại này như lá bài Cơ bản đó để sử dụng.";
	},
	olfeibai(player) {
		const bool = player.storage.olfeibai;
		let yang = "Khi bạn do thực thi hiệu quả của lá bài không phải màu đen mà bạn sử dụng gây sát thương, giá trị sát thương này +1",
			yin = "Khi bạn do thực thi hiệu quả của lá bài không phải màu đỏ mà bạn sử dụng hồi phục thể lực, giá trị hồi phục này +1";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Chuyển hoán kỹ, Tỏa định kỹ.",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	olmiuyan(player) {
		const bool = player.storage.olmiuyan;
		let yang = "gây sát thương, thì bạn nhận được tất cả các lá bài đã được trình ra trong giai đoạn này",
			yin = "không gây sát thương, thì bạn khiến kỹ năng này vô hiệu cho đến khi vòng này kết thúc";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Chuyển hoán kỹ. Bạn có thể xem một lá bài màu đen như 【Hỏa Công】 để sử dụng, sau đó nếu lá bài này:",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	olsaogu(player) {
		const bool = player.storage.olsaogu;
		let yang = "vứt bỏ hai lá bài (không được bao gồm chất bài bạn đã vứt trong giai đoạn này), sau đó sử dụng lá 【Sát】 trong đó",
			yin = "rút một lá bài";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Chuyển hoán kỹ. ① Giai đoạn ra bài, bạn có thể:",
			end = "。② Giai đoạn kết thúc, bạn có thể vứt bỏ một lá bài, khiến một nhân vật khác thực thi nhánh 〖Tảo Cốc ①〗 hiện tại của bạn.";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	oldongdao(player) {
		if (player.storage.oldongdao) {
			return 'Khi hiệp của Nông dân kết thúc: Âm, bạn có thể khiến Địa chủ tiến hành một hiệp phụ; <span class="bluetext">Dương, người đó có thể tiến hành một hiệp phụ</span>.';
		}
		return 'Khi hiệp của Nông dân kết thúc: <span class="bluetext">Âm, bạn có thể khiến Địa chủ tiến hành một hiệp phụ</span>; Dương, người đó có thể tiến hành một hiệp phụ.';
	},
	ollangdao(player) {
		var str = "Khi bạn sử dụng 【Sát】 chỉ định mục tiêu duy nhất, bạn có thể cùng nhân vật mục tiêu đó đồng thời chọn một:";
		var list = ["1. Khiến sát thương cơ bản của lá 【Sát】 này +1;", "2. Khiến bạn có thể chọn thêm một mục tiêu cho lá 【Sát】 này;", "3. Khiến lá 【Sát】 này không thể bị hưởng ứng."];
		var storage = player.getStorage("ollangdao");
		list.forEach((item, index) => {
			if (storage.includes(index)) {
				str += `<span style="text-decoration: line-through;">${item}</span>`;
			} else {
				str += item;
			}
		});
		str += "Sau đó nếu không có nhân vật nào chết vì lá 【Sát】 này, bạn xóa bỏ hạng mục đã được chọn lần này.";
		return str;
	},
	olxuanzhu(player) {
		const bool = player.storage.olxuanzhu;
		let yang = "Lá bài Cơ bản bất kỳ",
			yin = "Lá Cẩm nang thường bất kỳ (phải chỉ định mục tiêu và chỉ chỉ định một mục tiêu)";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Chuyển hoán kỹ. Mỗi hiệp giới hạn một lần, bạn có thể gọi một lá bài là “Huyền” rồi đặt lên lá võ tướng, sau đó xem như sử dụng:",
			end = "。Nếu lá “Huyền” được đặt lên lá võ tướng lần này: không phải là bài Trang bị, bạn vứt bỏ một lá bài; là bài Trang bị, bạn bỏ tất cả “Huyền” vào đống bài bỏ, sau đó rút số lá bài tương ứng.";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	olziruo(player) {
		const bool = player.storage.olziruo;
		let yang = "bên trái",
			yin = "bên phải";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Chuyển hoán kỹ, Tỏa định kỹ. ① Khi bạn sử dụng lá bài trên tay ở ngoài cùng ",
			end = " nhất, bạn rút một lá bài. ② Sau khi bạn rút bài theo cách này, bạn không thể sắp xếp lại bài trên tay trong hiệp này.";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
	olkouchao(player) {
		const nameList = player.storage.olkouchao || ["sha", "huogong", "guohe"];
		const str = nameList.map(i => "【" + get.translation(i) + "】").join("/");
		return "Mỗi vòng mỗi hạng mục giới hạn một lần, bạn có thể xem một lá bài như " + str + " để sử dụng. Sau khi lá bài này kết toán xong, đổi hạng mục này thành tên của lá bài Cơ bản hoặc Cẩm nang thường cuối cùng không vì sử dụng mà vào đống bài bỏ trong ván game này, sau đó nếu tất cả hạng mục của 〖Khấu Sao〗 đều là bài Cơ bản, bạn sửa tất cả hạng mục của 〖Khấu Sao〗 thành 【Thuận Thủ Khiên Dương】.";
	},
	olliyong(player) {
		const bool = player.storage.olliyong;
		let yang = "bạn có thể xem một lá bài có chất mà bạn chưa sử dụng trong hiệp này như 【Quyết Đấu】 để sử dụng",
			yin = "bạn có thể nhận từ xấp bài một lá bài có chất mà bạn đã sử dụng trong hiệp này, khiến một nhân vật khác xem như sử dụng một lá 【Quyết Đấu】 đối với bạn";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Chuyển hoán kỹ. Giai đoạn ra bài, ",
			end = "。";
		return `${start}Dương: ${yang}; Âm: ${yin}${end}`;
	},
};
export default dynamicTranslates;
