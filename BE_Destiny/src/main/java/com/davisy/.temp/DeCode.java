public class 人工智能 {

    // 初始化权重
    public static double[] 初始化权重(int 尺寸) {
        double[] 权重 = new double[尺寸];
        for (int i = 0; i < 尺寸; i++) {
            权重[i] = Math.random();
        }
        return 权重;
    }

    // 计算预测输出
    public static double 预测(double[] 输入, double[] 权重) {
        double 结果 = 0;
        for (int i = 0; i < 输入.length; i++) {
            结果 += 输入[i] * 权重[i];
        }
        return 结果;
    }

    // 训练AI模型
    public static double[] 训练(double[][] 输入, double[] 实际结果, double 学习率, int 迭代次数) {
        int 尺寸 = 输入[0].length;
        double[] 权重 = 初始化权重(尺寸);
        for (int 次数 = 0; 次数 < 迭代次数; 次数++) {
            for (int i = 0; i < 输入.length; i++) {
                double 预测结果 = 预测(输入[i], 权重);
                double 误差 = 实际结果[i] - 预测结果;
                for (int j = 0; j < 尺寸; j++) {
                    权重[j] += 学习率 * 误差 * 输入[i][j];
                }
            }
        }
        return 权重;
    }

    public static void main(String[] args) {
        // 输入数据和实际结果
        double[][] 输入 = {{0, 0}, {0, 1}, {1, 0}, {1, 1}};
        double[] 实际结果 = {0, 1, 1, 1};
        
        // 学习率和迭代次数
        double 学习率 = 0.1;
        int 迭代次数 = 1000;

        // 训练模型
        double[] 权重 = 训练(输入, 实际结果, 学习率, 迭代次数);

        // 打印学习到的权重
        System.out.println("学习到的权重:");
        for (int i = 0; i < 权重.length; i++) {
            System.out.println("权重 " + i + ": " + 权重[i]);
        }
    }

    // 初始化权重
    public static double[] 初始化权重(int 尺寸) {
        double[] 权重 = new double[尺寸];
        for (int i = 0; i < 尺寸; i++) {
            权重[i] = Math.random();
        }
        return 权重;
    }

    // 预测输出
    public static double 预测(double[] 输入, double[] 权重) {
        double 结果 = 0;
        for (int i = 0; i < 输入.length; i++) {
            结果 += 输入[i] * 权重[i];
        }
        return 结果;
    }

    // 训练模型
    public static double[] 训练(double[][] 输入, double[] 实际结果, double 学习率, int 迭代次数) {
        int 尺寸 = 输入[0].length;
        double[] 权重 = 初始化权重(尺寸);
        for (int 次数 = 0; 次数 < 迭代次数; 次数++) {
            for (int i = 0; i < 输入.length; i++) {
                double 预测结果 = 预测(输入[i], 权重);
                double 误差 = 预测结果 - 实际结果[i];
                for (int j = 0; j < 尺寸; j++) {
                    权重[j] -= 学习率 * 误差 * 输入[i][j];
                }
            }
        }
        return 权重;
    }

    public static void main(String[] args) {
        // 输入数据和实际结果
        double[][] 输入 = {{0, 1}, {1, 3}, {2, 5}, {3, 7}, {4, 9}};
        double[] 实际结果 = {1, 3, 5, 7, 9};
        
        // 学习率和迭代次数
        double 学习率 = 0.01;
        int 迭代次数 = 1000;

        // 训练模型
        double[] 权重 = 训练(输入, 实际结果, 学习率, 迭代次数);

        // 打印学习到的权重
        System.out.println("学习到的权重:");
        for (int i = 0; i < 权重.length; i++) {
            System.out.println("权重 " + i + ": " + 权重[i]);
        }
    }

    // 初始化数据
    public static List<double[]> 初始化数据() {
        List<double[]> 数据 = new ArrayList<>();
        数据.add(new double[]{5.1, 3.5, 1.4, 0.2, 0});
        数据.add(new double[]{4.9, 3.0, 1.4, 0.2, 0});
        数据.add(new double[]{7.0, 3.2, 4.7, 1.4, 1});
        数据.add(new double[]{6.4, 3.2, 4.5, 1.5, 1});
        数据.add(new double[]{6.3, 3.3, 6.0, 2.5, 2});
        数据.add(new double[]{5.8, 2.7, 5.1, 1.9, 2});
        return 数据;
    }
}
